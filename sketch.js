const buttons = document.getElementsByClassName("buttons");
let w = 15;
let values = []; 
let states = []; //her çubuğun durumunu saklamak ve renk değiştirmek için
let controller = true;

function setup() {
    if (controller) {
        controller =false;
        createCanvas(600, 300); 
        values = new Array(floor(width / w)); 
        for (let i = 0; i < values.length; i++) {
            values[i] = Math.floor(float(random(height))); 
             states[i] = -1;
            print(values);
        }
        print("Unsorted Array:" + values); // To print values to Browser's Console
        controller = true;
    } else {
        showAlert("danger","Please wait for the sorting to be completed!");
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

const showAlert = (type,message) => {
   console.log(buttons[0]);
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`; 
    alert.textContent = message;
    buttons[0].appendChild(alert);

    
    setTimeout(function(){
        alert.remove();
    },2000);
}


const BubbleSort = async () => {
    if (controller) {
        controller = false;
        for (var i = 0; i < values.length - 1; i++) {
            for (var j = 0; j < values.length - i - 1; j++) {
                if (values[j] >= values[j + 1]) {
                    await swap(values, j, j + 1);
                }
            }
        } 
        print("Bubble Sorted Array:" + values);
        showAlert("success","Well done! Sorting completed.");
        controller = true;
        return values;
    
} else {
    showAlert("danger","Please wait for the sorting to be completed!");
}
};


const QuickSort = async () => {
    if (controller) {
        quickSort(values, 0, values.length);
    } else {
        showAlert("danger","Please wait for the sorting to be completed!");
    }
};


async function quickSort(arr, start, end) {
    controller = false;
    if (start >= end) {
        return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end),
    ]);

    
    async function partition(arr, start, end) {
        for (let i = start; i < end; i++) {
            states[i] = 1;
        }

        let pivotIndex = start;
        let pivotValue = arr[end];
        states[pivotIndex] = 0;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, pivotIndex);
                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 0;
            }
        }

        await swap(arr, pivotIndex, end);

        for (let i = start; i < end; i++) {
            states[i] = -1;
        }

        return pivotIndex;

    }
    controller = true;

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
        print("Insertion Sorted Array:" + values);
        showAlert("success","Well done! Sorting completed.");
        controller = true;
    } 
    else {
        showAlert("danger","Please wait for the sorting to be completed!");
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
            print("Selection Sorted Array:" + values);    
        }
        showAlert("success","Well done! Sorting completed.");
        controller = true;
    } 
    else {
        showAlert("danger","Please wait for the sorting to be completed!");
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
        print("Counting Sorted Array:" + values);
        showAlert("success","Well done! Sorting completed.");
        controller = true;
    } 
    else {
        showAlert("danger","Please wait for the sorting to be completed!");
    }
};

function MergeSort() {
    if (controller) {
        controller = false;
        copy = values.slice();
        mergeSortSlice(copy, 0, copy.length);
        return;
    }
    else {
        showAlert("danger","Please wait for the sorting to be completed!");
    }
    controller = true;
}

async function mergeSortSlice(a, start, end) {
    controller = false;
    if (end - start <= 1) 
    return;

    var mid = Math.round((end + start) / 2);

    // wait till divides are sort
    await mergeSortSlice(a, start, mid);
    await mergeSortSlice(a, mid, end);

    // merge divides
    let i = start,
        j = mid;
    while (i < end && j < end) {
        if (a[i] > a[j]) {
            let t = a[j];
            a.splice(j, 1);
            a.splice(i, 0, t);
            j++;
        }
        i++;
        if (i == j) j++;
        // copy back the current state of the sorting
        values = a.slice();
        // slow down
        await sleep(50);
    }
    // restart
    if (start == 0 && end == a.length) {
        await sleep(50);
        startSort = true;
        print("Merge Sorted Array:" + values);
        showAlert("success","Well done! Sorting completed.");
    }
}

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
        print("Shell Sorted Array:" + values);
        showAlert("success","Well done! Sorting completed.");
        controller = true;
    } else {
        showAlert("danger","Please wait for the sorting to be completed!");
    }
};

const swap = async (arr, a, b) => {
    await sleep(100);
    let t = arr[a];
    arr[a] = arr[b];
    arr[b] = t;
};

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
