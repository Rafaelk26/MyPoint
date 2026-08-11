import { useEffect, useState } from 'react';

// Components
import { ContainerLayout } from '../../components/Container';
import { ListDataPerson } from '../../components/ListDataPerson';

// Hooks
import { Screen } from '../../hooks/Screen';

// Style
import {
  ScrollContainer,
  Title,
  ViewInfo,
  TitleInfo,
  ViewLogoutButton
} from './style';

import { ButtonSubmit } from '../../components/ButtonSubmit';

export default function Profile() {

  const [loading, setLoading] = useState(true);

  const [profileInfo, setProfileInfo] = useState([
    { id: 1, name: "Nome", icon: "user-alt", value: "Rafael Kikuchi" },
    { id: 2, name: "CPF", icon: "id-badge", value: "525.064.908-41" },
    { id: 3, name: "Email", icon: "at", value: "rafaelk262002@gmail.com" },
    { id: 4, name: "Telefone", icon: "phone-alt", value: "(12) 98196-0559" },
    { id: 5, name: "Cargo", icon: "chess-rook", value: "Web Designer" },
    { id: 6, name: "Empresa", icon: "building", value: "Escala de Milhões..." },
  ]);

  const [workInfo, setWorkInfo] = useState([
    { id: 1, name: "Carga horária semanal", icon: "clock", value: "44h" },
    { id: 2, name: "Jornada diária", icon: "clock", value: "08:00 às 18:00" },
    { id: 3, name: "Dias trabalhados", icon: "calendar", value: "Seg à Sex" },
  ]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      await new Promise(resolve => setTimeout(resolve, 1000));

      setLoading(false);
    }

    load();
  }, []);

  return (
    <Screen loading={loading}>
      <ContainerLayout>
        <ScrollContainer>

          <Title>Meu Perfil</Title>

          {/* Dados Pessoais */}
          <ViewInfo>
            <TitleInfo>Dados Pessoais</TitleInfo>

            {profileInfo.map((item, index) => (
              <ListDataPerson
                key={item.id}
                data={item}
                isLast={index === profileInfo.length - 1}
              />
            ))}

          </ViewInfo>

          {/* Jornada de Trabalho */}
          <ViewInfo>
            <TitleInfo>Jornada de Trabalho</TitleInfo>

            {workInfo.map((item, index) => (
              <ListDataPerson
                key={item.id}
                data={item}
                isLast={index === workInfo.length - 1}
              />
            ))}
          </ViewInfo>

          {/* Logout */}
          <ViewLogoutButton>
            <ButtonSubmit title="Sair da conta" />
          </ViewLogoutButton>

        </ScrollContainer>

      </ContainerLayout>

    </Screen>
  );
}