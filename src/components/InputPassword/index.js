import { useState } from 'react';
import { Feather } from '@expo/vector-icons';

// Styles
import { ContainerInput, InputView, IconView, IconButton } from './style';

export function InputPassword({ placeholder, ...rest }) {

    const [show, setShow] = useState(false);


 return (
    <ContainerInput>
        {/* Input Password */}
        <InputView
            secureTextEntry={show}
            placeholder={placeholder} 
            placeholderTextColor={'#B1B1B1'}
            {...rest}
        />

        {
            show ? (
                <IconButton onPress={() => setShow(false)}>
                    <IconView>
                        <Feather name="eye" size={24} color="#000" />
                    </IconView>
                </IconButton>

            ) : (
                <IconButton onPress={() => setShow(true)}>
                    <IconView>
                        <Feather name="eye-off" size={24} color="#000" />
                    </IconView>
                </IconButton>
            )
        }
    </ContainerInput>
  );
}