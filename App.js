import React, { useState } from 'react';
import { TouchableOpacity, Modal } from 'react-native';

import Tutorial from './Tutorial'
import StartPage from './StartPage'

export default function App() {
  const [tutorialShow, setTutorialShow] = useState(true)

  const tutorialHandler = () => {
    setTutorialShow(false)
  }

  if (tutorialShow) {
    return (
      <Modal animationType={'fade'}>
        <TouchableOpacity onPress={tutorialHandler}>
          <Tutorial />
        </TouchableOpacity>
      </Modal>
    )
  } else {
    return (
        <StartPage />
    )
  }

}

