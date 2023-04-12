
# Gofinances - Documentação

<div>
  <img source="https://user-images.githubusercontent.com/98706938/231578669-9da0f32f-7b85-4636-9b1f-ad12ab69258c.svg" width="100px" />
</div>

## Sumário

- [Gofinances - Documentação](#gofinances---documentação)
  - [Sumário](#sumário)
  - [1. Sobre](#1-sobre)
    - [2. Instalando Dependencias](#2-instalando-dependencias)
    - [3. Variáveis de ambiente](#3-variáveis-de-ambiente)
    - [4. Acessando a aplicação](#5-acessando-a-aplicação)

---

## 1. Sobre

Aplicativo feito para organização de finanças, tal como acompanhamento de gastos e noções de transações diárias.

- [React-Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Expo](https://expo.dev/)
- [Expo-Auth-Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Expo-Apple-Authentication](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)
- [Expo-Font](https://docs.expo.dev/guides/using-custom-fonts/)
- [React-Hook-Form](https://react-hook-form.com/)
- [React-Native-Gesture-Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React-Navigation](https://reactnavigation.org/)

### 2. Instalando Dependencias

Antes de apresentar o guia de instalação, certifique-se que você possua o Expo instalado em seu smartphone ou emulador.

Clone o repositório em sua máquina, assim que terminar rode o comando:

```shell
cd gofinances
```

Para instalar as dependências, rode o comando:

```
yarn install
```

**Atenção:** é necessário utilizar o `yarn` pois esse projeto foi iniciado com esse gerenciador de pacotes.

Para verificar se já possui o gerenciador yarn instalado utilize o seguinte comando:

```
yarn --version
```

Caso não possua o yarn instalado, utilize o comando abaixo para instalar globalmente na sua máquina:

```
npm install --global yarn
```

### 3. Variáveis de ambiente

Para essa etapa, é necessário que você possua a variável "Redirect URI" que só é possível
adquirir através da sua conta pessoal do expo, e do "Client ID" que também só é possível adquirir
através do Google APIS.

Crie um arquivo **.env**, seguindo estritamente o exemplo do **.env.example**:

```shell
cp .env.example .env
```

Defina suas variáveis de ambiente de acordo com o solicitado, sem aspas ou espaços.

**Exemplo do .env**

```
CLIENT_ID=1234.apps.googleusercontent.com
REDIRECT_URI=https://auth.expo.io/@<SEU_NOME_DE_USUÁRIO_EXPO>/bluefinances
```

### 4. Acessando a aplicação

Após seguir todos os passos anteriores, basta iniciar o Expo com o seguinte comando:

```shell
npx expo start
```

Logo após o servidor local do Expo terminar, basta escanear o código QR ou digitar manualmente o link do servidor local aberto por você e utilizar o app!
