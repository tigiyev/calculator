## Notes

- buffer is current number stored in memory
- buffer is NOT always equal to innerHTML
- buffer default state is undefined


## Test. Basics
+ 000 			(0)
+ = 				(0)
+ * 				(preview 0 *)
+ *= 				(preview 0 * 0)
+ 1+2= 			(3)
+ 1+2== 			(5)
+ 5-= 			(0)
+ 5-== 			(-5)
+ 5-*2+ 			(10)
+ 5-=+ 			(0)
+ 5-=+= 			(0)


## Test. Negative

+ 5-6=neg		(-1)
+ 5neg*8neg=		(40)
- 5neg*8neg=neg		(-40)(preview negate(40))





## Bugs

- bug 0.2 + 0.1 = 0.3000000000000003


- bug 1.0 + 2 = =
- bug 1.0 = (display preview shows 0 instead of 1)
- bug 2.000 + (does not remove zeros from display first time )
- bug 0. have to be turned to 0 if clicked on operators



## Todo
- add negative
- add decimals
- add backspace button
- add tousand separator
- add keyboard input