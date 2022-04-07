
DOM操作   数据操作 -> 数据操作来进行事件处理函数的绑定   (数据和DOM不能完全隔离


为了使两者完全隔离 避免之前的交叉使用
一个观察者类使之有机结和起来  TodoList


addTodo -> todo -> addItem(todo) ->操作DOM

add      addTodo addItem
remove removeTodo removeItem
toggle toggleTodo toggleItem

联想到观察者模式循环执行数组(其中用Promise进行的隔离 Promise不止有进行异步处理的功能(还兼有异步的处理) 之后的扩展功能放入数组就好
[ addTodo addItem ]
[ removeTodo removeItem ]
[ toggleTodo toggleItem ]


观察者模式结合单例模式来实现

promise与操作数据类的结合
DOM操作类编写


