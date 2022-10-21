# MyChat

https://my-chat-sage.vercel.app

이 프로젝트는 간단한 채팅을 할 수 있는 웹 프로젝트입니다. Firebase를 간단하게 사용해보고자 짧게 진행한 풀스택 개발 토이 프로젝트입니다.

-   Login (로그인)
-   Register (회원가입)
-   Home (사용자 리스트, 개인 채팅, 로그아웃)

## 주요 사용 기술

1. 프론트엔드

-   React (create-react-app으로 구현되었습니다.)
-   React-router-dom
-   MUI

2. 백엔드, DB

-   Firebase

## 설치 방법

1. 프론트 엔드 서버 실행

```bash
npm start
```

## 프로젝트 설명

firebase currentUser에 user 정보가 없을 경우 login 화면을 보여줍니다.
login 화면에서 회원가입 페이지로 이동할 수 있고 회원가입 페이지에서 name, email, password를 입력받아 firebase를 통해 회원가입을 진행 후 Home으로 이동합니다.
Home 화면에서는 지금까지 가입된 유저 리스트를 보여주고 유저를 클릭하면 대화가 시작됩니다.
