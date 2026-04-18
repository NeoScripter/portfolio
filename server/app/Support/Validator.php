<?php

declare(strict_types=1);

namespace Support;

use InvalidArgumentException;

class Validator
{
    private array $errors = [];
    private array $result = [];
    private bool $validated = false;

    private function __construct(
        private array $values,
        private array $rules,
    ) {}

    public static function make(array $values, array $rules)
    {
        return new static($values, $rules);
    }

    public function validate()
    {
        $this->validated = true;

        foreach ($this->rules as $key => $rule_set) {

            if (! isset($this->values[$key]) && in_array('nullable', $rule_set)) {
                $this->result[$key] = null;
                continue;
            }

            if (! isset($this->values[$key])) {
                $this->errors[$key] = 'This field is required';
                continue;
            }

            foreach ($rule_set as $rule) {
                [$name, $param] = explode(':', $rule . ':', 2);

                $error = match ($name) {
                    'required' => $this->required($this->values[$key]),
                    'min' => $this->min_length($this->values[$key], (int) $param),
                    'max' => $this->max_length($this->values[$key], (int) $param),
                    'nullable' => '',
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

        return $this;
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
