import { ActivityIndicator } from 'react-native';

import { Container } from './style';

export function Loading(){

    return(
        <Container>
            <ActivityIndicator
                size="large"
                color="#0076FE"
            />
        </Container>
    )
}