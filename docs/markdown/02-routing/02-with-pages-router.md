<!-- .slide: class="two-column with-code" -->

# Pages router

The app router always has priority over the page router

Routes :

```
/
/admin
/admin/employees
```

##--##

<br/> <br/> <br/> <br/> <br/>

src directory :

```
src/
  app/
    page.tsx           <- used
    admin/
      employees/
        page.tsx       <- used
  pages/
    admin/
      index.tsx        <- used
      employees.tsx    <- ignored
```
