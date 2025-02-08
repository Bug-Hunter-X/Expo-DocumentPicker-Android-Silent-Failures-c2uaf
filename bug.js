This bug occurs when using the Expo DocumentPicker API on Android.  After selecting a file, the promise sometimes rejects with an error that is not very descriptive, such as `Error: selection cancelled`.  However, the user may have actually *not* cancelled the selection – the selection may have failed silently due to an underlying issue, such as insufficient permissions or a file system error. This leads to difficulty in debugging and providing appropriate feedback to the user.  There is no clear way to differentiate between a user-initiated cancellation and an unexpected failure.

Example Code (React Native):
```javascript
import * as DocumentPicker from 'expo-document-picker';

const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync();
    if (result.type === 'cancel') {
      console.log('User cancelled');
    } else if (result.uri) {
      console.log('Selected:', result.uri);
    } else {
      console.log('Error:', result); // This often just shows a generic error
    }
  } catch (error) {
    console.error('Error picking document:', error);
  }
};
```