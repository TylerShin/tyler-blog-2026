---
title: "Composition Is All You Need | Fernando Rojo at React Universe Conf 2025"
date: "2024-03-15"
type: "video"
description: "React에서 상속 대신 합성을 사용하는 방법에 대한 영상."
url: "https://youtu.be/4KvbVq3Eg5w?si=7DzmrJHHm8-5kEj8"
lang: "ko"
translationKey: "react-composition-pattern"
thumbnail: "/images/picks/react-composition-patterns.jpg"
---

비슷하지만 아주 조금식 다른 UI(그것도 비즈니스 로직도 살짝 다른)를 props 지옥으로 해결하지 않고 composition을 활용해 슬기롭게 해결해나가는 과정이 흥미로움. 나도 요즘 최대한 이런 식으로 해결하려고 했는데, 문제를 해결하는 시선이 비슷해서 좋았음.

다만, 저런 경우 비즈니스 로직에 따라 엄청 다양한 상위 Composer component의 variant가 나올 수 있는데, 걔를 관리하는 것도 좀 생각해봐야 할 거 같음.

참고로 이 영상에서 나오는 패턴은 전통적인 디자인 패턴 중 **Strategy Pattern**(컴포넌트를 전략처럼 주입)이나 **Template Method Pattern**(골격만 정의하고 내용은 하위에서 정의)과 유사함.
