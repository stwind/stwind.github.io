---
title: The Haskell Do notation
name: the-haskell-do-notation
time: 2014-01-13T11:20:33+08:00
---

The excellent [Haskell Tutorial](http://learnyouahaskell.com/) has a very good explanation of the [`do` notation](http://learnyouahaskell.com/a-fistful-of-monads#do-notation). But it still took me quite some hours to finally understand how to convert to and from plain `>>=` statements and `do` notations. I wrote a simple script to help me memorize it.

[readmore]: #monad-for-functions

## Monad For Functions

In the chapter of [Reader Monad](http://learnyouahaskell.com/for-a-few-monads-more#reader), there is an example demostrating usage fo function monad:

```haskell
import Control.Monad.Instances  
  
addStuff :: Int -> Int  
addStuff = do  
    a <- (*2)  
    b <- (+10)  
    return (a+b)  
```

Can you convert this `do` notation back to plain `>>=` statement? Well as an Haskell newbie I finally did. Create a `monad.hs` with following content:

```haskell
import Text.Printf

literal = (*2) >>= (\x -> (+10) >>= (\y -> \_ -> x + y) )
doNotation = do 
       x <- (*2)
       y <- (+10)
       return (x + y)

main = do 
          printf "literal: %d\n" (literal 3 :: Int)
          printf "do notation: %d\n" (doNotation 3 :: Int)
```

and run it:

```bash
$ runghc monad.hs
literal: 19
do notation: 19
```

Greate! Actually the important part in the last lambda:

```haskell
\y -> \_ -> x + y
```

It should be a function that ignore its argument and just return the result.
