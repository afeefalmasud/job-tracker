1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Ans: getElementById, getElementsByClassName, and querySelector / querySelectorAll these are method to find element from DOM. If I need specific one element then i used getElementById. getElementsByClassName selects class name and returns htmlCollection. htmlCollection is like an array. querySelector, querySelectorAll use css selector. main difference between them querySelector returns first matching element and querySelectorAll return NodeList which is like an array

2. How do you create and insert a new element into the DOM?
Ans: 
create element:
const div = document.createElement("div");
insert a new element:
document.body.appendChild(div);

3. What is Event Bubbling? And how does it work?
Ans: Event bubbling means when i click a child element the event goes upward to its parent. after that it goes to parent's parent, then body, then document.
how does it work is explained in below:
A div with class "parent" and inside it a button with class "child".
First → Button event runs
Then → Parent event runs
Then → Body
Then → Document

4. What is Event Delegation in JavaScript? Why is it useful?
Ans: Event delegation is javascript means i add one listener to the parent insted of adding event listener to many child elements.
It is useful because cleaner code, works from dynamically added elements. 

5. What is the difference between preventDefault() and stopPropagation() methods?
Ans: preventDefault() stopes default browser behavior and stopPropagation() stops event from bubbling up.
