import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { ChatTeardropDots } from 'phosphor-react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Form } from './../Form';
import { Success } from '../Sucess';
import { Options } from '../Options';

import { feedbackTypes } from '../../utils/feedbackTypes';

import { styles } from './styles';
import { theme } from '../../theme';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);  
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  };

  function handleFeedbackTypeChange(type: FeedbackType) {
    setFeedbackType(type);
  };

  function handleFeedbackRestart() {
    setFeedbackType(null);
    setFeedbackSent(false);
  };

  function handleFeedbackSent() {
    setFeedbackSent(true);
  };  

  return (
    <>
      <TouchableOpacity
        style={styles.button}  
        onPress={handleOpen}
      >
        <ChatTeardropDots 
          size={24} 
          weight="bold"
          color={theme.colors.text_on_brand_color} 
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSent ? (
            <Success 
              onFeedbackRestart={handleFeedbackRestart} 
            />
          ) : (
            feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCancel={handleFeedbackRestart}
                onFeedbackSent={handleFeedbackSent}
              />              
            ) : (
              <Options onFeedbackTypeChanged={handleFeedbackTypeChange} />
            )                           

          )
        }


      </BottomSheet>
    </>
  );
};

export default gestureHandlerRootHOC(Widget);