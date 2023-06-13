<img alt="MIT" src ="https://img.shields.io/badge/license-MIT-salmon">  <img alt="" src ="https://img.shields.io/badge/IDE-VSCode-indianred"> <img alt="" src ="https://img.shields.io/badge/OS-ubuntu-coral"><br>

---
# 2023-1-OSSProj-HotSource-4

# 프로젝트 제목 : 오픈소스를 활용하여 이클래스에 협업 기능 개발



## Tech Stack
<div align=center>
  
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/ChakraUI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white">

  <img src="https://img.shields.io/badge/Apollo-311C87?style=for-the-badge&logo=Apollo-GraphQL&logoColor=white">
<img src="https://img.shields.io/badge/GraphQL-E434AA?style=for-the-badge&logo=GraphQL&logoColor=white">

  <br>
    <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
</div>




<br>

# 프로젝트 핵심 내용 : 
- 이클래스와 유사한 페이지를 구현하고 팀활동 페이지에 메모 기능과 채팅 기능을 포함한 협업 기능을 추가하였습니다.
- 관리자 계정(교수님 계정)으로 접속하여 수강생들을 선택하여 팀 생성이 가능합니다.
- 학생 계정으로 접속하여 본인에게 부여된 팀을 조회하고 팀활동 modal 창에서 협업 기능을 사용할 수 있습니다.


<br>


## Main Feature:

<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/630de4fb-7f47-4362-9077-b97fb15ffb0b">
</p>
<p align="center">
- 이클래스 페이지 구현
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/aa20d546-d1bd-40ae-82fe-5fb9569660a6">
</p>
<p align="center">
- 이클래스 플랫폼에서 관리 가능한 팀활동 페이지 
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/a23623df-f3de-4bf4-b6b9-968cc9987b8b">
</p>
<p align="center">
- 팀활동 페이지 내에서 조원들이 관리할 수 있는 메모 기능
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/7a89c6fa-ae01-4d8d-91d2-905988c12214">
</p>
<p align="center">
- 팀활동 페이지 내에서 단체 채팅 기능
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/bc474cad-bf8b-43bd-859d-76ab556a06ee">
</p>
<p align="center">
- 수강생을 조회하여 조별 활동 관리가 가능한 관리자 계정 
</p>
<br>


### graphQL 기반 코드 적용 예시:
message.model.js
```
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", MessageSchema);

```
message.mutation.js
```
export const mutSendMessage = async (_, { content, groupId }, { user }) => {
  requireAuth(user);

  const group = await Group.findById(groupId);
  const detailedUser = await User.findById(user._id);

  if (!group.members.includes(user._id)) {
    throw new Error("Unauthorized");
  }

  const message = new Message({
    content,
    user: detailedUser,
    group: group, 
  });

  await message.save();

  return message;
};

```
message.query.js
```
export const queryMessages = async (_, { groupId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  
  const messages = await Message.find({ group: groupId })
  .populate({
    path: 'user',
    select: 'username',
  })
  .populate({
    path: 'group',
    select: 'name',
  })
  .sort({ createdAt: 1 });

  const result = messages.map(message => ({
    ...message._doc,
    isCurrentUser: String(message.user._id) === String(user._id),
    groupName: message.group.name,
  }));

  return result;
};

```

<br>

 ## 로컬 구동 방법:
 설치

 ```
git clone https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4.git

npm install .
```
실행
```
MogoDB compress 설치 후 DB 연결

로컬 환경에서 .env 파일 생성 후 DB URL, jwt secret, PORT 입력

유저 더미 데이터셋 csv 파일을 DB에 추가

npm start server 또는 yarn dev (더미 데이터를 생성할 경우 server.js에서 await initData(); 에 주석 취소해주시기 바랍니다.)

npm start
```
<br>

### 프로젝트 구조도:

<p align="center">
스키마 구조도
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/77df13a0-8ad4-4878-81fd-5706e11dbb5c">
</p>
<p align="center">
컴포넌트 구조도
<p align="center">
  <img src="https://github.com/CSID-DGU/2023-1-OSSProj-HotSource-4/assets/102755472/5e190c4a-0570-47f1-89ae-8a8d407231c2">
</p>

<br><br>
### References:
- https://github.com/CSID-DGU/2022-2-OSSProj-Let-sGitIt-6
- https://github.com/craftzdog/craftzdog-homepage/blob/master/components/layouts/article.js
- https://github.com/chakra-ui/chakra-ui-docs
- https://github.com/graphql/graphql-js
<br><br>
### 데모영상 링크:
https://drive.google.com/file/d/1j_ovHXyGPBHO2YYSeSabLTgsuofICnUr/view?usp=drive_link
<br><br>

### 개발자:
|이름|학번|역할|전화번호|github|email|
|------|---|---|---|---|---|
|민헌준|2018112964|프론트엔드|01085217581|https://github.com/Kenjunn0|tamunavollt1@gmail.com|
|고영웅|2017112801|백엔드|01039050389|https://github.com/UniverseDolphin|mentist9803@naver.com|
|이유빈|2020111727|백엔드|01077113696|https://github.com/a0100019|dldbqls0019@naver.com|
