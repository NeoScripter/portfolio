<?php

declare(strict_types=1);

function resize_image(
    string $source,
    string $dest_dir,
    int $width,
    ?string $format = 'webp',
): string {
    if (!is_dir($dest_dir) && !mkdir($dest_dir, 0755, recursive: true)) {
        throw new RuntimeException("Failed to create directory: $dest_dir");
    }

    $filename = image_filename($source);

    $dest = "{$dest_dir}/{$filename}.{$format}";
    $quality = $format === 'webp' ? 75 : 50;

    $src_arg  = escapeshellarg($source);
    $dest_arg = escapeshellarg($dest);

    $cmd = "convert {$src_arg} -resize {$width}x> -strip -quality {$quality} {$dest_arg}";

    exec($cmd, output: $output, result_code: $code);

    if ($code !== 0) {
        throw new RuntimeException(
            "convert failed for variant '{$filename}': " . implode("\n", $output)
        );
    }

    return $dest;
}


function image_filename(string $original_name): string
{
    $name = pathinfo($original_name, PATHINFO_FILENAME);
    $slug = preg_replace('/[^a-z0-9]+/', '-', strtolower($name));
    $slug = trim($slug, '-');
    return $slug . '-' . substr(uniqid(), -6);
}

function validate_image(
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

/**
 * Strip all embedded PHP tags, scripts, and metadata from an image
 * by re-encoding it through ImageMagick convert.
 *
 * This works by having convert decode and re-encode the pixel data,
 * discarding any embedded text, EXIF, XMP, ICC profiles, and PHP payloads.
 *
 * @param string $source Absolute path to the uploaded tmp file
 * @param string $dest   Absolute path to write the sanitized output
 *
 * @throws \RuntimeException if sanitization fails
 */
function sanitize_image(string $source, string $dest): void
{
    $src  = escapeshellarg($source);
    $out  = escapeshellarg($dest);

    $cmd = "convert {$src}[0] -strip +profile \"*\" {$out}";

    exec($cmd, output: $output, result_code: $code);

    if ($code !== 0) {
        throw new RuntimeException(
            'Image sanitization failed: ' . implode("\n", $output)
        );
    }
}
