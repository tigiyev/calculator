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




## Test. Long numbers
- how many digits is max? (12)
+ 123456789*123456789= 			(1.524158e+16)
- 1/3= 		(0.33333333333)
- bug 0.2 + 0.1 = 0.3000000000000003


## Test. Decimal
- 1..2		(1.2)
- .2 			(0.2)
- 1.0= 		(1)(preview 1=)
- 1.000+ 	(1)(preview 1+)
- 1+2=.		(0.)(preview empty)




## Todo
- add negative
- add decimals
- add backspace button
- add tousand separator
- add keyboard input