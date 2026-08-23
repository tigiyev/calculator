## Notes

- buffer is current number stored in memory
- buffer is NOT always equal to innerHTML
- buffer default state is undefined


## Tests. Basics

+ 000 (0)
+ = (0)
- * (preview 0 *)
- *= (preview 0 * 0)
+ 1+2= (3)
+ 1+2== (5)
+ 5-= (0)
+ 5-== (-5)
+ 5-*2+ (10)
+ 5-=+ (0)
+ 5-=+= (0)




## Bugs

- bug 0.2 + 0.1 = 0.3000000000000003

+ fix bug changing operator (10 + -) results in running equasion (as =)
+ fix bug when b change to 0 if I click operator for the second time
+ fix 1 + = (1 instead of 2) 

- bug 1-1 == (stays 0 instead of -1)
- bug 2+2= 9 (29 instead of 9)

- bug when a result is negative and you change it to positive, in the next equasion it remembers negative value instead of new one
10-20= (-10) +/- +1 = (-9 instead of 11)

- bug 10+/- - 2+/- = (woks fine??)

- bug 1.0 + 2 = =
- bug 1.0 = (display preview shows 0 instead of 1)
- bug 2.000 + (does not remove zeros from display first time )
- bug 0. have to be turned to 0 if clicked on operators



## Todo
- add decimals
- add backspace button
- add tousand separator
- add keyboard input


