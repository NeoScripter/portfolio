<?php

declare(strict_types=1);

namespace Support;

use Base;
use InvalidArgumentException;
use RuntimeException;
use Imagick;
use ImagickException;

class Validator
{
    private array $errors = [];
    private array $result = [];
    private bool $validated = false;

    protected function __construct(
        private array $values,
        private array $rules,
    ) {}

    public static function make(array $values, array $rules)
    {
        return new self($values, $rules);
    }

    private function prepare_for_validation()
    {
        $this->values = array_filter(
            $this->values,
            function ($val) {
                if (is_string($val) && trim($val) === '') {
                    return false;
                }

                return true;
            }
        );
    }

    public function validate()
    {
        $this->validated = true;
        $this->prepare_for_validation();

        foreach ($this->rules as $key => $rule_set) {

            if (! isset($this->values[$key])) {
                if ($rule_set[0] === 'sometimes') {
                    continue;
                } else if ($rule_set[0] === 'nullable') {
                    $this->result[$key] = null;
                    continue;
                } else if (str_starts_with($rule_set[0], 'required_with')) {
                    $this->values[$key] = null;
                } else {
                    $this->errors[$key] = 'This field is required';
                    continue;
                }
            }

            foreach ($rule_set as $rule) {
                [$name, $param] = explode(':', $rule . ':', 2);
                $param = rtrim($param, ':');

                $error = match ($name) {
                    'required' => $this->required($this->values[$key]),
                    'required_with' => $this->required_with($this->values[$key], $param),
                    'string' => $this->string($this->values[$key]),
                    'integer' => $this->integer($this->values[$key]),
                    'min' => $this->min_length($this->values[$key], (int) $param),
                    'max' => $this->max_length($this->values[$key], (int) $param),
                    'image' => $this->image($this->values[$key], (int) $param),
                    'exists' => $this->exists($this->values[$key], ...explode(',', $param)),
                    'unique' => $this->unique($this->values[$key], ...explode(',', $param)),
                    'nullable' => '',
                    'sometimes' => '',
                    default => throw new InvalidArgumentException("Unknown validation rule: '$name'"),
                };

                if ($error !== '') {
                    $this->errors[$key] = $error;
                    break;
                }
            }

            if (!isset($this->errors[$key])) {
                $this->result[$key] = $this->values[$key];
            }
        }

        if (empty($this->result)) {
            $this->errors[array_key_first($this->rules)] = 'The input is empty';
        }

        return $this;
    }

    private function exists(mixed $value, string $table, string $field): string
    {
        $db = Base::instance()->get('DB');

        $res = $db->exec("
            SELECT EXISTS (
                SELECT 1 FROM $table WHERE $field = ?
            ) AS exists
        ", [$value]);

        if (empty($res) || !$res[0]['exists']) {
            return 'We could not find the existing record';
        }

        return '';
    }

    private function unique(mixed $value, string $table, string $field): string
    {
        $db = Base::instance()->get('DB');

        $res = $db->exec("
            SELECT EXISTS (
                SELECT 1 FROM $table WHERE $field = ?
            ) AS exists
        ", [$value]);

        if ($res[0]['exists']) {
            return "The field {$field} already exists";
        }

        return '';
    }

    private function string($value)
    {
        if (! is_string($value))
            return 'This field must be a string';

        return '';
    }

    private function integer($value)
    {
        if (! is_int($value))
            return 'This field must be an integer';

        return '';
    }

    private function image($value, $limit = null)
    {
        if (! is_array($value))
            return 'Invalid file upload';

        $error = $this->validate_image($value, $limit);

        if ($error != null) {
            return $error;
        }

        try {
            $this->sanitize_image($value['tmp_name'], $value['tmp_name']);
        } catch (RuntimeException $e) {
            return 'Failed to sanitize the image: ' . $e->getMessage();
        }
        return '';
    }


    private function required($value)
    {
        $error_message =  'This field is required';

        if (is_object($value))
            return 'Invalid value format';

        if (is_array($value) && empty($value))
            return $error_message;

        if (is_string($value) && strlen($value) === 0)
            return $error_message;

        if ($value === null)
            return $error_message;

        return '';
    }

    private function required_with($value, string $field): string
    {
        if (isset($this->values[$field]) && empty($value)) {
            return 'This field is required';
        }

        return '';
    }

    private function min_length($value, $limit = 0)
    {
        $error_message =  "This field must be at least {$limit} characters";

        if (is_string($value))
            return strlen($value) < $limit ? $error_message : '';

        if (is_int($value))
            return (int) $value < $limit ? $error_message : '';

        return 'Invalid value format';
    }

    private function max_length($value, $limit = 0)
    {
        $error_message =  "This field length should not exceed {$limit} characters";

        if (is_string($value))
            return strlen($value) > $limit ? $error_message : '';

        if (is_int($value))
            return (int) $value > $limit ? $error_message : '';

        return 'Invalid value format';
    }

    public function fails()
    {
        $this->ensure_validated();
        return !empty($this->errors);
    }

    public function passes()
    {
        $this->ensure_validated();
        return !$this->fails();
    }

    public function errors()
    {
        $this->ensure_validated();
        return $this->errors;
    }

    public function validated()
    {
        $this->ensure_validated();
        return $this->result;
    }

    private function ensure_validated()
    {
        if (! $this->validated) {
            $this->validate();
        }
    }

    private function validate_image(
        array $file,
        int $max_mb = 10,
        array $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
    ): string {

        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            return 'No image was uploaded';
        }

        $max_bytes = $max_mb * 1024 * 1024;

        if ($file['error'] !== UPLOAD_ERR_OK) {
            return match ($file['error']) {
                UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'The image is too large',
                UPLOAD_ERR_PARTIAL                        => 'The image was only partially uploaded',
                UPLOAD_ERR_NO_FILE                        => 'No image was uploaded',
                default                                   => 'Upload failed with error code ' . $file['error'],
            };
        }

        if ($file['size'] > $max_bytes) {
            $mb = round($max_bytes / 1024 / 1024);
            return "The image must not exceed {$mb}MB";
        }

        $mime = mime_content_type($file['tmp_name']);
        if (!in_array($mime, $allowed, strict: true)) {
            return "Invalid image type '{$mime}'. Allowed: " . implode(', ', $allowed);
        }

        $tmp = escapeshellarg($file['tmp_name']);
        exec("identify {$tmp} 2>&1", output: $output, result_code: $code);

        if ($code !== 0) {
            return 'The file is not a valid image';
        }

        return '';
    }

    private function sanitize_image(string $source, string $dest): void
    {
        try {
            $img = new \Imagick($source . '[0]');
            $img->stripImage();
            $img->profileImage('*', null);
            $img->writeImage($dest);
            $img->destroy();
        } catch (\ImagickException $e) {
            throw new RuntimeException(
                'Image sanitization failed: ' . $e->getMessage()
            );
        }
    }
}
