# Plataforma para venda de carros.

![screencapture-localhost-5173-2024-11-08-22_33_56](https://github.com/user-attachments/assets/36bd3079-13b8-40e4-b864-171b4828e4a6)

## Descrição

Uma plataforma inovadora para compra e venda de veículos, desenvolvida com React e TypeScript para garantir uma experiência rápida e intuitiva. O sistema é responsivo e otimizado para diferentes dispositivos, permitindo que usuários acessem e explorem os veículos disponíveis de maneira prática, tanto no desktop quanto no mobile. As interfaces são intuitivas, com formulários validados e uma navegação fluida.

## Funcionalidades
- **Cadastro de Veículos:** Usuários autenticados podem cadastrar novos carros no sistema.
- **Listagem de Carros Cadastrados:** Visualização de todos os carros cadastrados na conta do usuário.
- **Exclusão de Carros:** Opção para remover veículos cadastrados diretamente da conta.
- **Filtro por Modelo**: Ferramenta de busca para localizar veículos específicos por modelo.
- **Página de Detalhes do Veículo:** Exibe informações completas sobre cada carro, incluindo especificações, descrição, imagens, preço e localização, oferecendo uma visão detalhada para ajudar o usuário na decisão de compra.

## 🚀 Tecnologias Utilizadas
- **React:** Biblioteca para construção de interfaces de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework utilitário para estilização rápida e responsiva.
- **React Router:** Navegação entre as diferentes páginas do aplicativo.
- **Axios:** Cliente HTTP para realizar chamadas à API.
- **React Icons:** Conjunto de ícones para uso em toda a aplicação.
- **Swiper:** Biblioteca para criar sliders responsivos e atraentes para a exibição de produtos.
- **React Hot Toast:** Biblioteca para exibir notificações de feedback aos usuários.
- **React Hook Form:** Gerencia os formulários de forma eficiente, melhorando a experiência do usuário com validação rápida e otimizada.
- **Zod:** Biblioteca de validação utilizada em conjunto com o React Hook Form para garantir que os dados do formulário sejam validados antes do envio.
- **Firebase:** Utilizado para autenticação de usuário e gerenciamento de dados em tempo real, proporcionando uma experiência de uso rápida e segura.

## 🚀 Como Rodar o Projeto
   1. Clone o repositório:
   ```bash
   git@github.com:Mateusveloso26/webCarros.git
   ```

   2. Entre no diretório do projeto
   ```bash
   cd webCarros
   ```

   3. Instale as dependências
   ```bash
   npm install
   ```

   4. Inicie o servidor
   ```bash
   npm run dev
   ```

## Configuração de Variáveis de Ambiente
Para configurar o acesso ao Firebase no projeto, é necessário definir as variáveis de ambiente que o Vite utilizará durante o desenvolvimento. Siga os passos abaixo para configurar corretamente as variáveis de ambiente.

1. **Crie um arquivo `.env` na raiz do projeto**
Se você ainda não tiver um arquivo `.env` na raiz do seu projeto, crie um novo. Esse arquivo será usado para armazenar as variáveis de ambiente necessárias.

2. **Defina as variáveis de ambiente**
Adicione as seguintes variáveis de ambiente ao arquivo `.env`. Estas variáveis são necessárias para configurar o Firebase, mas devem ser substituídas pelos valores reais do seu projeto:

   ```env
   VITE_API_KEY=your_api_key_here
   VITE_AUTH_DOMAIN=your_auth_domain_here
   VITE_PROJECT_ID=your_project_id_here
   VITE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_APP_ID=your_app_id_here



