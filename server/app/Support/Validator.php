<?php

declare(strict_types=1);

namespace Support;

use Base;
use InvalidArgumentException;
use RuntimeException;

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
                if (! in_array('sometimes', $rule_set) && ! in_array('nullable', $rule_set)) {
                    $this->errors[$key] = 'This field is required';
                } else if (in_array('nullable', $rule_set)) {
                    $this->result[$key] = null;
                }
                continue;
            }

            foreach ($rule_set as $rule) {
                [$name, $param] = explode(':', $rule . ':', 2);

                $error = match ($name) {
                    'required' => $this->required($this->values[$key]),
                    'string' => $this->string($this->values[$key]),
                    'min' => $this->min_length($this->values[$key], (int) $param),
                    'max' => $this->max_length($this->values[$key], (int) $param),
                    'image' => $this->image($this->values[$key], (int) $param),
                    'exists' => $this->exists($this->values[$key], ...explode(',', $param)),
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
                SELECT 1 FROM `$table` WHERE `$field` = ?
            ) AS `exists`
        ", [$value]);

        if (empty($res) || !$res[0]['exists']) {
            return 'We could not find the existing record';
        }

        return '';
    }

    private function string($value)
    {
        if (! is_string($value))
            return 'This field must be a string';

        return '';
    }

    private function image($value, $limit = null)
    {
        if (! is_array($value))
            return 'Invalid file upload';

        $error = validate_image($value, $limit);

        if ($error != null) {
            return $error;
        }

        try {
            sanitize_image($value['tmp_name'], $value['tmp_name']);
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

    private function min_length($value, $limit = 0)
    {
        $error_message =  "This field must be at least {$limit} characters";

        if (! is_string($value))
            return 'Invalid value format';

        if (strlen($value) < $limit)
            return $error_message;

        return '';
    }

    private function max_length($value, $limit = 0)
    {
        $error_message =  "This field length should not exceed {$limit} characters";

        if (! is_string($value))
            return 'Invalid value format';

        if (strlen($value) > $limit)
            return $error_message;

        return '';
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
}
