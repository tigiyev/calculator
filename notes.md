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
+ after calculation if new numbers is added clear preview
+ 1+2=5+5=		(10)


## Test. Negative

+ 5-6=neg					(1)
+ 5neg*8neg=				(40)
+ 5neg*8neg=neg			(-40)(preview negate(40))
+ 5neg*8neg=negneg		(40)(preview 40)
+ 1+2=neg=					(-1)

? sometimes preview and display are not equal
e.g 43 and -43 after clicking neg multiple times




## Test. Long numbers (12 digits max)
+ cant input digits more than display max
+ 123456789*123456789= 			(1.524158e+16)
+ 1/3= 		(0.33333333333)
+ 1111/3=	(370.333333333)
+ 555555555555/2 	(277777777778)
~ 555555555555neg/2 	(-277777777778)
+ 555555555555neg*== 	(do not exceed max digit)

## Test. Decimal
- 1..2		(1.2)
- .2 			(0.2)
- 1.0= 		(1)(preview 1=)
- 1.000+ 	(1)(preview 1+)
- 1+2=.		(0.)(preview empty)
- bug 0.2 + 0.1 = 0.3000000000000003




## Todo
+ add negative
- fix large numbers
- add decimals
- add backspace button
- add tousand separator
- add keyboard input
- if devide to 0, display funny message