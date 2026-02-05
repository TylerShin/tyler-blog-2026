---
title: "Composition Is All You Need | Fernando Rojo at React Universe Conf 2025"
date: "2024-03-15"
type: "video"
description: "A video about using composition instead of inheritance in React."
url: "https://youtu.be/4KvbVq3Eg5w?si=7DzmrJHHm8-5kEj8"
lang: "en"
translationKey: "react-composition-pattern"
thumbnail: "/images/picks/react-composition-patterns.jpg"
---

It's interesting to see how they solve similar but slightly different UIs (with slightly different business logic) using composition instead of props hell. I've been trying to solve problems in a similar way recently, so it was good to see a shared perspective on problem-solving.

However, in such cases, depending on the business logic, you might end up with many variants of the parent Composer component, and managing those seems like something that needs careful thought.

For reference, the pattern discussed in this video is similar to the traditional **Strategy Pattern** (injecting components like strategies) or **Template Method Pattern** (defining the skeleton but letting subclasses/children define the details).
