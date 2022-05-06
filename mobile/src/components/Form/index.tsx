import React, { useState } from 'react';
import { 
  View, 
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import * as FileSystem from 'expo-file-system';

import { ArrowLeft } from 'phosphor-react-native';
import { captureScreen } from 'react-native-view-shot';

import { FeedbackType   } from '../Widget';
import { ScreenshotButton } from '../ScreenShotButton';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';

import { api } from '../../libs/api';

import { theme } from '../../theme';
import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCancel: () => void;
  onFeedbackSent: () => void;
};

export function Form({ feedbackType, onFeedbackCancel, onFeedbackSent  }: FormProps) {
  
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then((uri) => setScreenshot(uri))
      .catch((err) => console.log(err));
  };

  function handleScreenshotRemove() {
    setScreenshot(null);
  };

  async function handleFeedbackSend() {
    if (isSendingFeedback) return;

    setIsSendingFeedback(true);
    
    const base64Screenshot =
      screenshot && (await FileSystem.readAsStringAsync(screenshot, {encoding: 'base64'}));

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot: screenshot
          ? `data:image/png;base64, ${base64Screenshot}`
          : null
      });

      onFeedbackSent();
    } catch (error) {
      console.log(error);
      setIsSendingFeedback(false);
    }
  };  



  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCancel}>
          <ArrowLeft 
            size={24}
            weight='bold'
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image}  />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>

      <TextInput 
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false} 
        onChangeText={setComment}
      />
      
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeScreenshot={handleScreenshot}
          onRemoveScreenshot={handleScreenshotRemove}
          screenshot={screenshot}       
        />
        
        <Button 
          isLoading={isSendingFeedback} 
          onPress={handleFeedbackSend}
        />

      </View>
    
    </View>
  );
};