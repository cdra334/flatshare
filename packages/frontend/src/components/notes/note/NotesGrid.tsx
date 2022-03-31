import React, { useState } from 'react';
import { Text, Grid, Card } from '@nextui-org/react';
import { NoteTypes } from './noteCardController';
import PlainModal from './plainModal';
import SecretModal from './secretModal';
import WifiModal from './wifiModal';

interface NotesGridProps {
  Notes:
    | {
        name: string;
        value: string;
        type: string;
        house: { [key: string]: unknown };
      }[]
    | undefined;
}

const NotesGrid: React.FC<NotesGridProps> = ({ Notes }) => {
  const [wifiVisible, setWifiVisible] = useState(false);
  const [secretVisible, setSecretVisible] = useState(false);
  const [plainVisible, setPlainVisible] = useState(false);
  const [qrCodeText, setQrCodeText] = useState('');
  const [qrvisible, setQRVisible] = useState(false);

  const [data, setData] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const ENCRYPTION = 'WEP';

  let loading = false;

  const handleOpenNote = (name: string, value: string, type: string) => {
    setData(value);
    if (type === NoteTypes.PLAIN) {
      setPlainVisible(true);
    } else if (type === NoteTypes.SECRET) {
      setSecretVisible(true);
    } else if (type === NoteTypes.WIFI) {
      setUsername(value.split(':')[0]);
      setPassword(value.split(/:(.*)/s)[1]);
      setWifiVisible(true);
    }
  };

  return (
    <div>
      <Grid.Container gap={2} justify="center">
        {Notes?.map((item, index) => (
          <Grid xs={18} md={6} sm={6} key={index}>
            <Card
              color="secondary"
              hoverable
              clickable
              onClick={() => handleOpenNote(item.name, item.value, item.type)}
            >
              <Text color="black" size={30} weight="semibold">
                {item.name}
              </Text>
              <Text
                color="primary"
                size={14}
                transform="uppercase"
                weight="semibold"
              >
                {item.type}
              </Text>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <PlainModal
        visible={plainVisible}
        setVisible={setPlainVisible}
        loading={loading}
        data={data}
      />
      <SecretModal
        visible={secretVisible}
        setVisible={setSecretVisible}
        loading={loading}
        data={data}
      />
      <WifiModal
        visible={wifiVisible}
        setVisible={setWifiVisible}
        setQrCodeText={setQrCodeText}
        qrCodeText={qrCodeText}
        loading={loading}
        userName={username}
        password={password}
        encryption={ENCRYPTION}
        qrvisible={qrvisible}
        setQRVisible={setQRVisible}
      />
    </div>
  );
};

export default NotesGrid;
