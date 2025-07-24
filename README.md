# Online Kimbap Ordering System

A responsive web application for placing and managing Kimbap pick-up orders. <br />
Built with React, Node.js, Firebase, and Stripe.

사용자가 원하는 김밥 메뉴, 수령 장소, 시간을 선택해 주문할 수 있는 웹 애플리케이션입니다. <br />
React, Node.js, Firebase, Stripe로 구현되었습니다.

🔗 [Live Demo](https://elly-kimbap.netlify.app/)

## 💡 Overview

Users can place pick-up orders by selecting Kimbap items, location, and time. <br />
Admins manage menu and logistics. Stripe ensures secure payments.

사용자는 김밥 메뉴, 수령 장소, 시간을 선택하여 주문할 수 있고, 관리자는 메뉴와 수령 장소 및 시간을 관리할 수 있습니다. <br />
Stripe를 통해 안전한 결제가 이루어집니다.

## 👤 User Features

- Browse Kimbap menu with images and ingredients <br />
  김밥 이미지 및 재료 정보 확인
- Select pick-up location & time <br />
  수령 장소 및 시간 선택
- Place and pay for orders via Stripe <br />
  Stripe를 통한 주문 및 결제
- View order history with pagination <br />
  페이지네이션 기능이 있는 주문 이력 보기
- Login via email link or Google <br />
  이메일 링크 또는 구글 로그인 기능

## 🛠 Admin Features

- Upload & manage Kimbap items <br />
  김밥 메뉴 등록 및 관리
- Set pick-up time slots and locations <br />
  수령 시간대 및 장소 설정
- Monitor orders and update menu <br />
  주문 내역 확인 및 메뉴 수정

## 🖼 Screenshots

<details>
<summary>Click to view</summary>

![Main Page](/images/main_page.png)
![Order Page](/images/menu_page.png)
![Payment Page](/images/payment_page.png)
![Order History](/images/history_page.png)
![Admin Management](/images/management_page.png)

</details>

## 🧰 Tech Stack

| Category   | Tech                |
| ---------- | ------------------- |
| Frontend   | React.js, Bootstrap |
| Backend    | Node.js, Express.js |
| Auth & DB  | Firebase            |
| Payment    | Stripe              |
| Deployment | Netlify             |
