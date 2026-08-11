import { useState } from 'react';
import { Text } from 'react-native';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

// Style
import { 
    Container,
    ViewInfo,
    ViewIcon,
    ViewInfoPDF,
    TextTitlePDF,
    TextSizePDF,
    ButtonMoreActions
} from './style';

export function PDF({ data, onMore }){

    const theme = useTheme();

    return(
        <Container key={data.id}>
            <ViewInfo>
                <ViewIcon>
                    <FontAwesome5 name="file-pdf" size={30} color={theme.colors.blue} />
                </ViewIcon>
                <ViewInfoPDF>
                    <TextTitlePDF>{data.name}</TextTitlePDF>
                    <TextSizePDF>{data.size}</TextSizePDF>
                </ViewInfoPDF>
            </ViewInfo>
            <ButtonMoreActions onPress={onMore}>
                <Entypo name="dots-three-vertical" size={22} color="#575757" />
            </ButtonMoreActions>
        </Container>
    )
}