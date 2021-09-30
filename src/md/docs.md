---
title: About
---

<div class="text-center">
  <!-- You can use Vue components inside markdown -->
  <carbon-dicom-overlay class="text-4xl -mb-6 m-auto" />
  <h3>About</h3>
</div>

[Vitesse](https://github.com/antfu/vitesse) is an opinionated [Vite](https://github.com/vitejs/vite) starter template made by [@antfu](https://github.com/antfu) for mocking apps swiftly. With **file-based routing**, **components auto importing**, **markdown support**, I18n, PWA and uses **WindiCSS** for UI.

```js
// syntax highlighting example
function vitesse() {
  const foo = 'bar'
  console.log(foo)
}
```

Check out the [GitHub repo](https://github.com/antfu/vitesse) for more details.


# Документация
- Таблицы
- Маршруты

<div class="tables">
<div class="table">

## Users
|name          |type        |
|--------------|------------|
|**id**        |bigint(20)  |
|**login**     |varchar(255)|
|**password**  |varchar(255)|
|**created_at**|timestamp   |
|**updated_at**|timestamp   |

</div>
<div class="table">

## Groups
|name          |type        |
|--------------|------------|
|**id**        |bigint(20)  |
|**name**      |varchar(255)|
|**slug**      |varchar(255)|
|**course**    |varchar(255)|
|**created_at**|timestamp   |
|**updated_at**|timestamp   |

</div>
<div class="table">

## Days
|name          |type        |
|--------------|------------|
|**id**        |bigint(20)  |
|**name**      |varchar(255)|
|**group_id**  |bigint(20)  |
|**created_at**|timestamp   |
|**updated_at**|timestamp   |

</div>
<div class="table">

## Lessons
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**day_id**              |bigint(20)  |
|**firstDiscopline**     |bigint(20)  |
|**secondiscopline**     |bigint(20)  |
|**firstOddCabinet**     |bigint(20)  |
|**secondOddCabinet**    |bigint(20)  |
|**firstEvenCabinet**    |bigint(20)  |
|**secondEvenCabinet**   |bigint(20)  |
|**firstOddTeacher**     |bigint(20)  |
|**secondOddTeacher**    |bigint(20)  |
|**firstEvenTeacher**    |bigint(20)  |
|**secondEvenTeacher**   |bigint(20)  |
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
<div class="table">

## Changes
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**day_id**              |bigint(20)  |
|**oddDiscipline_id**    |bigint(20)  |
|**evenDiscipline_id**   |bigint(20)  |
|**firstOddCabinet**     |bigint(20)  |
|**secondOddCabinet**    |bigint(20)  |
|**firstEvenCabinet**    |bigint(20)  |
|**secondEvenCabinet**   |bigint(20)  |
|**firstOddTeacher**     |bigint(20)  |
|**secondOddTeacher**    |bigint(20)  |
|**firstEvenTeacher**    |bigint(20)  |
|**secondEvenTeacher**   |bigint(20)  |
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
<div class="table">

## Disciplines
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
<div class="table">

## Cabinets
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
<div class="table">

## Teachers
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
<div class="table">

## Dates
|name                    |type        |
|------------------------|------------|
|**id**                  |bigint(20)  |
|**name**                |varchar(255)|
|**updated_at**          |timestamp   |
|**created_at**          |timestamp   |

</div>
</div>