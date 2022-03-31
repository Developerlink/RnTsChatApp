import firestore from '@react-native-firebase/firestore';
import {Message} from '../models/message';

interface Props {
  roomId: string;
  messageLimit: number;
}

const fetchMessagesAsync = ({roomId, messageLimit}: Props) => {
  return new Promise<Message[]>((resolve, reject) => {
    try {
      firestore()
        .collection('chatrooms')
        .doc(roomId)
        .collection('messages')
        .limit(messageLimit)
        .orderBy('createdAt', 'desc')
        .onSnapshot({includeMetadataChanges: true}, querySnapshot => {
          if (querySnapshot.metadata.hasPendingWrites) {
            return; // ignore cache snapshots where new data is being written
          }

          const fetchedMessages = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data(),
              createdAt: doc
                .data()
                .createdAt.toDate()
                .toISOString()
                .slice(2, 16)
                .replace(/-/g, '/')
                .replace('T', ' '),
            } as Message;
          });

          resolve(fetchedMessages);
        });
    } catch (error) {
      reject('Something went wrong contacting the server.');
    }
  });
};

export {fetchMessagesAsync};
