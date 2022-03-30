import firestore from '@react-native-firebase/firestore';
import {Message} from '../models/message';

interface Props {
  roomId: string;
  messageLimit: number;
}

const getMessagesAsync = async ({roomId, messageLimit}: Props) => {
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

      return querySnapshot.docs.map(doc => {
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
    });
};

export {getMessagesAsync};
