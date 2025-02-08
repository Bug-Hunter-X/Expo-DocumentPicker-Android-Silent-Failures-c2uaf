# Expo DocumentPicker Android Silent Failures

This repository demonstrates a bug in Expo's `expo-document-picker` library on Android.  The promise returned by `getDocumentAsync()` sometimes rejects without providing sufficient information to determine the cause of the failure.  This makes it hard to provide user-friendly error messages and handle errors gracefully.

## Problem

When selecting files using `expo-document-picker` on Android, the picker can silently fail.  The promise rejects, but the error message is often vague (e.g., `Error: selection cancelled`), even if the user did not explicitly cancel the selection.  The underlying cause could be various issues such as insufficient permissions or problems with the device's file system.  The current API offers no way to distinguish between a legitimate user cancellation and a silent failure.

## Reproduction

1. Clone this repository.
2. Run `npm install`.
3. Run the app on an Android device or emulator.
4. Attempt to select a file using the DocumentPicker.  Observe that some attempts may fail silently with unhelpful error messages.

## Solution (Proposed)

The `expo-document-picker` API should be improved to provide more detailed error information, allowing developers to distinguish between user cancellation and unexpected failures.  This would enable more robust error handling and better user experience.
