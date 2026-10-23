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
+ 1..2		(1.2)
+ .2 			(0.2)
+ 1.0= 		(1)(preview 1=)
+ 1.000+ 	(1)(preview 1+)
+ 1+2=.		(0.)(preview empty)
+ bug 0.2 + 0.1 = 0.3000000000000003


## Test. Keyboard support
+ on page start focus on input
- when display shows 0, next inputed digit clears 0
- number exceeds 12digits
- input does not take Infiniti nor NaN, maybe switch it to input text
- 0/5 and 5/0 gives input different results (0 and empty)
- 5/0 	(NaN)


## Reference calc
! can I insert digit in the middle of the number? NO
! can I delete digit in the middle of the number? NO
! can I negate with the keyboard? NO
! can I type decimal separator? YES
! can I type operators using keyboard? YES
! tousand separator works only on whole numper part


## Todo
+ add negative
+ fix large numbers
+ add decimals
+ if devide to 0, display funny message
+ add backspace button


## Maybe
- add keyboard support
- write calc manual in HTML
~ add tousand separator