window.addEventListener('load', function() {
    //获取元素
    var inp = document.querySelector('.inp');
    var btn = document.querySelector('button');
    var ul = document.querySelector('ul');
    //绑定事件
    btn.addEventListener('click', function() {
        add();
        getAll();
        inp.value = '';
        setTimeout(() => {
            btn.style.display = 'none';
            inp.value = "别玩了 学前端去"
            inp.className = 'inp';
        }, 200);
    });

    inp.addEventListener('focus', function() {
        if (this.value === "别玩了 学前端去")
            this.value = '';
        this.className = 'focus';
        btn.style.display = 'block';
    });

    inp.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = "别玩了 学前端去";
            this.className = 'inp';
            btn.style.display = 'none';
        } else this.className = 'focus';

    });

    btn.addEventListener('mouseenter', function() {
        btn.className = 'btn';
    });

    btn.addEventListener('mouseleave', function() {
        btn.className = '';
    });

    // //AJAX
    // 增加单条
    function add() {
        var y = inp.value;
        //1.创建对象
        let xhr = new XMLHttpRequest();
        //2.初始化 设置请求方法和url
        xhr.open('POST', 'http://47.113.187.45:8989/todo/index/create', true);
        //设置请求头
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //3.发送
        xhr.send("msg=" + y);
    }
    var i = 0; //控制li的内容

    // 获取全部数据
    function getAll() {
        //1.创建对象
        let xhr = new XMLHttpRequest();
        //设置响应体数据的类型
        xhr.responseType = 'json';
        //等0.1秒再执行
        setTimeout(() => {
            //2.初始化 设置请求方法和url
            xhr.open('GET', 'http://47.113.187.45:8989/todo/index/selectAll');
            //3.发送
            xhr.send();
            // 4.事件绑定 处理服务端返回的结果
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        // 动态生成li   
                        if (xhr.response.content == null) {
                            DELETEAll();
                            i = 0; //重新开始
                        }
                        var li = document.createElement('li');
                        li.innerHTML = xhr.response.content[i].Content + "<a href='javascript:;'></a>";
                        ul.appendChild(li);
                        var as = document.querySelectorAll('a');
                        for (var j = 0; j < as.length; j++) {
                            as[j].onclick = function() {
                                var id = xhr.response.content[i - 1].Id;
                                DELETE(id);
                                i--;
                                ul.removeChild(this.parentNode); //删除的是li 当前a所在的li this.parentNode;
                            }
                        }
                        i++;
                    }
                }
            }
        }, 100);
    }

    // 删除单条
    function DELETE(a) {
        //1.创建对象
        let xhr = new XMLHttpRequest();
        //2.初始化 设置请求方法和url
        xhr.open('DELETE', 'http://47.113.187.45:8989/todo/index/delete/' + a, true);
        //3.发送
        xhr.send();
    }

    // 删除全部
    function DELETEAll() {
        //1.创建对象
        let xhr = new XMLHttpRequest();
        //2.初始化 设置请求方法和url
        xhr.open('DELETE', 'http://47.113.187.45:8989/todo/index/deleteAll', true);
        //3.发送
        xhr.send();
    }
    DELETEAll();
})