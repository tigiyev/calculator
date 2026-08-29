## Notes

- buffer is current number stored in memory
- buffer is NOT always equal to display
- buffer default state is undefined


## Test. Basics
+ 000 			(0)
+ = 				(0)
+ * 				(preview 0 *)
+ *= 				(preview 0 * 0 = )
+ 1+2= 			(3)
+ 1+2== 			(5)
+ 5-= 			(0) (preview 5-5)
+ 5-== 			(-5) (preview 0-5)
+ 5-*2+ 			(10)
+ 5-=+ 			(0)
+ 5-=+= 			(0)
+ 5*==			(125)


## Test. Negative

+ 5-6=neg					(1)
+ 5neg*8neg=				(40)
+ 5neg*8neg=neg			(-40)(preview negate(40))
+ 5neg*8neg=negneg		(40)(preview 40)
+ 1+2=neg=					(-1)

? sometimes preview and display are not equal
e.g 43 and -43 after clicking neg multiple times



## Test. Decimal
- how many digits is max? (12)
- 123456789 * 123456789
- 1/3= 		(0.33333333333)
- 1/3=+4 			(4,333333333333333)
? calc functions does not work when a or b has long values 




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