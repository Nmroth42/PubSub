
// > Задача — реализовать паттерн pubsub
//   Для решения я использовал прототипное наследование
//   Класс реализован функционально

function Bus() {
    this.rooms = {};
}

Bus.prototype = {

    // метод, отвечающий за подписку
    // первый аргумент - имя комнаты
    // второй - функция обратного вызова, создающая шаблон для вывода информации 
    subscriber: function (name, callback) {

        // если массива с именем комнаты не существует, то создаем массив
        if (!this.rooms[name])
            this.rooms[name] = [];

        // добавление в массив name(названия комнаты) функцию-шаблонизатор
        this.rooms[name].push({
            callback: callback
        });

    },

    // метод, отвечающий за оповещение 
    // первый аргумент - имя комнаты
    // остальные аргументы, которые "срезаются"(39 строчка), служат для заполнения шаблона 
    publish: function (name) {

        // перебор все комнаты
        for (var i in this.rooms) {

            if (i === name) {
               // arguments указывает на параметр publish
                var args = Array.prototype.slice.call(arguments); 
                args.splice(0, 1);
                // переор всех подписчиков комнаты
                for (var j = 0; j < this.rooms[name].length; j++) { 
                    // apply для передачи массива аргументов. this указывает на объект - publish. 
                    this.rooms[name][j].callback.apply(this, args); // j - индекс подписки
                }
            }
        }
    }

};

// инициализируем экземпляр класса Bus
var bus = new Bus();

bus.subscriber('room1', function (roomContent) {
    console.log('new message in room1! content: ' + roomContent);
});

bus.subscriber('room2', function (roomContent) {
    console.log('new message in room2! content: ' + roomContent);
});


// всё, что после певрого аргумента - сообщения для комнаты
bus.publish('room1', 'Welcome to the room1!');
bus.publish('room2', 'Welcome to the room2!');

// сообщение в неизвестную комнату
bus.publish('room666', 'Welcome to the room666!');
