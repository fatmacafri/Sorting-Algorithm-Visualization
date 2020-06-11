let w = 15;
let values = []; //genişliği 15 olan değerler
//let states = []; //her çubuğun durumunu saklamak ve renk değiştirmek için
let controller = true;

function setup() {
    if (controller) {
        createCanvas(600, 300); // Create Canvas of Size Windows // Width * Windows Height
        values = new Array(floor(width / w)); // Sütunları oluşturmak için
        for (let i = 0; i < values.length; i++) {
            values[i] = Math.floor(float(random(height))); //Array içine random değerler eklemek
            //  states[i] = -1;
            window.print(values);
        }
        print("Unsorted Array:" + values); // To print values to Browser's Console
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }
}

draw = () => {
    background("white");

    for (let i = 0; i < values.length; i++) {
        stroke(0);
        fill("lightblue");
        rect(i * w, height - values[i], w, values[i]);

    }
}
const BubbleSort = async () => {
    if (controller) {
        controller = false;
        for (var i = 0; i < values.length - 1; i++) {
            for (var j = 0; j < values.length - i - 1; j++) {
                if (values[j] >= values[j + 1]) {
                    // states[j] = 1;

                    // Call to swap function
                    await swap(values, j, j + 1);
                    //states[j + 1] = 0;
                }
                //states[j] = 2;
            }
        }
        controller = true;
        return values;
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }
};

const QuickSort = async () => {
    quickSort(values, 0, values.length);
    print("Sorted Array:" + values);
}

//Asynchronous Definition of Quick Sort Function
async function quickSort(arr, start, end) {


    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    //states[index] = -1;

    // Promise.all is used so that each function
    // should invoke simultaneously
    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end),
    ]);


    // Asynchronous Definition of Partition Function
    async function partition(arr, start, end) {

        for (let i = start; i < end; i++) {
            //states[i] = 1;
        }

        let pivotIndex = start;
        let pivotValue = arr[end];
        //states[pivotIndex] = 0;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, pivotIndex);
                //states[pivotIndex] = -1;
                pivotIndex++;
                //states[pivotIndex] = 0;
            }
        }

        await swap(arr, pivotIndex, end);

        for (let i = start; i < end; i++) {
            //states[i] = -1;
        }

        return pivotIndex;

    }
}

const InsertionSort = async () => {
    if (controller) {
        controller = false;
        let length = values.length;
        for (let i = 1; i < length; i++) {
            let key = values[i];
            let j = i - 1;
            while (j >= 0 && values[j] > key) {
                values[j + 1] = values[j];
                j = j - 1;
                await sleep(100);
            }
            values[j + 1] = key;
        }
        controller = true;
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }
};

const SelectionSort = async () => {
    if (controller) {
        controller = false;
        // Clone original array to prevent its modification.
        for (let i = 0; i < values.length - 1; i += 1) {
            let minIndex = i;
            // Find minimum element in the rest of array.
            for (let j = i + 1; j < values.length; j += 1) {
                if (values[j] < values[minIndex]) {
                    minIndex = j;
                }
            }
            // If new minimum element has been found then swap it with current i-th element.
            if (minIndex !== i) {
                await swap(values, minIndex, i);
            }
            await sleep(100);
            print("Sorted Array:" + values);
        }
        controller = true;

    }
    else {
        alert("Please wait for the sorting to be completed!")
    }

};

const CountingSort = async () => {
    if (controller) {
        controller = false;
        const min = Math.min(...values);
        const max = Math.max(...values);
        let i;
        let z = 0;
        const count = [];

        for (i = min; i <= max; i++) {
            count[i] = 0;
        }

        for (i = 0; i < values.length; i++) {
            count[values[i]]++;
        }

        for (i = min; i <= max; i++) {
            while (count[i]-- > 0) {
                values[z++] = i;
                await sleep(100);
            }
        }
        controller = true;
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }
};

const MergeSort = () => {
    if (controller) {
        controller = false;
        const mergeSort = (values, half = values.length / 2) => {
            if (values.length < 2) {
                return values;
            }
            const left = values.splice(0, half); //left part of array
            return merger(mergeSort(left), mergeSort(values));
        };

        const merger = (left, right) => {
            const values = [];
            while (left.length && right.length) {
                if (left[0] < right[0]) {
                    values.push(left.shift());
                }
                else {
                    values.push(right.shift());
                }
            }

            return [...values, ...left, ...right];
        };
        values = mergeSort(values);
        controller = true;
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }

};
const ShellSort = async () => {
    if (controller) {
        controller = false;
        var increment = values.length / 2;
        while (increment > 0) {
            for (i = increment; i < values.length; i++) {
                var j = i;
                var temp = values[i];

                while (j >= increment && values[j - increment] > temp) {
                    values[j] = values[j - increment];
                    j = j - increment;
                }
                await sleep(100);
                values[j] = temp;
            }

            if (increment == 2) {
                increment = 1;
            } else {
                increment = parseInt((increment * 5) / 11);
            }
        }
        controller = true;
    }
    else {
        alert("Please wait for the sorting to be completed!")
    }
};





const swap = async (arr, a, b) => {
    await sleep(100);
    let t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
}

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
