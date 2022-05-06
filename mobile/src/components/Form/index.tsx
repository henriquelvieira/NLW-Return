import React from 'react';
import { 
  View, 
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { ArrowLeft } from 'phosphor-react-native';

import { FeedbackType   } from '../Widget';
import { ScreenshotButton } from '../ScreenShotButton';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { Button } from '../Button';

import { theme } from '../../theme';
import { styles } from './styles';

interface FormProps {
  feedbackType: FeedbackType;
  onFeedbackCancel: () => void;
  onFeedbackSent: () => void;
};


export function Form({ feedbackType, onFeedbackCancel, onFeedbackSent  }: FormProps) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

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
      />
      
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeScreenshot={()=> {}}
          onRemoveScreenshot={()=> {}}
          screenshot=''        
        />
        <Button isLoading={false} />
      </View>
    
    </View>
  );
};