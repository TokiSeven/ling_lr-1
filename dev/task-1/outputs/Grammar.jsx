import React from 'react';

export default class Grammar{
    getEndPoint(arr){
        let endPoint = null;
        for(let key in arr) // search endpoint in array
            if (arr[key]['end'] && key){
                endPoint = key;
                break;
            }
        return endPoint;
    }

    getLastEndPoint(arr){
        let endPoint = null;
        for(let key in arr) // search endpoint in array
            if (arr[key]['end'] && key){
                endPoint = key;
            }
        return endPoint;
    }

    checkEndPointExists(arr){
        return this.getEndPoint(arr) !== null;
    }

    convertToAssociativeMassive(arr = []){
        let converted = [];
        arr.forEach(function(v) {
            // v[0] is state's name
            // v[1] is state for terminal 0
            // v[2] is state for terminal 1
            // v[3] set to 1 if it is an end
            converted[v[0]] = {
                0: (v[1] != '' ? v[1] : null),
                1: (v[2] != '' ? v[2] : null),
                'end': v[3] == '1' ? true : false
            };
        }, this);
        return converted;
    }

    getRight(dataFromProps){
        let arr = this.convertToAssociativeMassive(dataFromProps);
        let errors = [];
        let results = [];
        if (!this.checkEndPointExists(arr)){
            errors.push(
                <span style = {{color: "red"}}>
                    Не найдена конечная точка
                </span>
            );
        }else{
            for(let key in arr){
                let row = arr[key];
                let countOfFreeStates = 2; // we can go only by 0 and 1
                let states = [];
                let ends = [];
                for(let i = 0; i < 2; i++){
                    if (row[i] != null){
                        if (row[i] in arr){
                            // push current state
                            states.push([i, row[i]]);
                            // now count of free places for states should increase
                            countOfFreeStates--;
                            // if next state is end point, i should push this end to the current state
                            if (arr[row[i]]['end'])
                                ends.push(i);
                        }else{
                            errors.push(
                                <span style = {{color: 'red'}}>
                                    Нет <b>{row[i]}</b> среди описанных.
                                    <br />
                                    Ошибка тут: терминал <b>{key}</b> при переходе <b>{i}</b>
                                </span>
                            );
                        }
                    }
                }
                // if it is end row and there is empty states (only one)
                // we can push it number in array
                if (countOfFreeStates == 1 && row['end']){
                    if (ends.indexOf(states[0][0]) == -1)
                        ends.push(states[0][0]);
                }

                // convert all ends line to str structure
                ends.forEach(function(v) {
                    states.push(['', v]);
                }, this);

                // converts every elemnts ([number, terminal]) in states to string
                let strings = [];
                for(let s of states)
                    strings.push(s.join(""));

                // convert all array states to string
                if (states.length > 0)
                    results.push(key + "::=" + strings.join("|"));
            }
        }
        return errors.length ? errors : results;
    }

    getLeftItem(element, firstElement, data, result){
        console.info("------------------------------");
        console.info("Current element: " + element);

        console.info("Current data:");
        console.info(data);

        console.info("Current result:");
        console.info(result);

        console.info("Starting....");

        if (!(element in result)){
            let states = [];
            let ends = [];
            for(let key2 in data) // поиск текущего элемента среди всех остальных, key2 - имя текущего
                for(let i = 0; i < 2; i++) // идем по треминалам 0 и 1, i - текущий терминал
                    if (data[key2][i] == element){
                        // если мы попали на себя (нашли т.е.),
                        // то надо добавить текущий элемент в наше текущее 'состояние'
                        states.push([key2, i]);
                        /*if (data[key2]['end']){
                            // а если это конечный элемент,
                            // то добавляем возможность выхода по нему
                            if (ends.indexOf(i) == -1)
                                ends.push(i);
                        }*/
                        if (key2 == firstElement)
                            ends.push(i);
                    }
            console.info("States: ");
            console.log(states);
            result[element] = {
                'states': states,
                'ends': ends
            };
            states.forEach(function(v){
                result = this.getLeftItem(v[0], firstElement, data, result);
            }, this);
        }

        return result;
    }

    getLeft(dataFromProps){
        let reversedData = [];
        for(let item of dataFromProps){
            reversedData.unshift(item);
        }
        let arr = this.convertToAssociativeMassive(reversedData);
        let errors = [];
        let results = [];

        if (!this.checkEndPointExists(arr)){
            errors.push(
                <span style = {{color: "red"}}>
                    Не найдена конечная точка
                </span>
            );
        }else{
            let firstElement = dataFromProps[0][0];
            let lastEndPoint = this.getEndPoint(arr);
            let inputState = dataFromProps[0][0];
            console.info("________NEW_DATA________");
            let result = this.getLeftItem(lastEndPoint, firstElement, arr, []);
            console.info("------------------------------");
            console.info("Result:");
            console.log(result);
            // конвертирование результата в массив строк (A::=....)
            for(let key in result){
                // идем по всем найденным состояниям
                let currStr = "";
                if (result[key].states.length > 0){
                    result[key].states.forEach((v, i, arr) => {
                        arr[i] = v.join("");
                    });
                    currStr += result[key].states.join("|");
                }
                if (result[key].ends.length > 0){
                    if (result[key].ends.indexOf(0) > -1)
                        currStr += (currStr == "") ? "0" : "|0";
                    if (result[key].ends.indexOf(1) > -1)
                        currStr += (currStr == "") ? "1" : "|1";
                }
                if (currStr != '')
                    results.push(key + "::=" + currStr);
            }
        }

        return errors.length ? errors : results;
    }
}