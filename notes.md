## Notes

-bug changing operator (10 + -) results in running equasion (as =)

buffer is NOT always equal to innerHTML
it stores last value similar to prevB??

- maybe delete prevB because it is the same as buffer

- b change to 0 if I click operator for the second time

## Bugs

- bug 0.2 + 0.1 = 0.3000000000000003

- 1 + = (1 instead of 2) 

- bug = 1+1= (1)
- bug 1.0 + 2 = =
- bug 1.0 = (display preview shows 0 instead of 1)
- bug 2.000 + (does not remove zeros from display first time )
- bug 0. have to be turned to 0 if clicked on operators



## Todo
- add decimals
- add backspace button
- add tousand separator
- add keyboard input



## Ideas
~ maybe make number conversion string to number only one time when change from buffer to a or b 
(no, there is a lot of logic on a and b = "")
