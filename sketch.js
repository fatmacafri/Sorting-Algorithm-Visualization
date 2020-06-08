
let w = 20, values = []; //genişliği 30 olan değerler
let states = []; //her çubuğun durumunu saklamak ve renk değiştirmek için
   
function setup(){
	createCanvas(600, 300);  // Create Canvas of Size Windows // Width * Windows Height 
    values = new Array(floor(width/w)); // Sütunları oluşturmak için
    for(let i = 0; i < values.length; i++) { 
        values[i] = Math.floor(float(random(height))) ; //Array içine random değerler eklemek
        states[i] = -1;  
        window.print(values);
	}  
	
	print("Unsorted Array:" + values); // To print values to Browser's Console 
}   

function BubbleSort() { 
	
    bubbleSort(values, 0, values.length); // Call to bubble sort function
    print("Sorted Array:" + values); // Print Sorted Array 
} 

function QuickSort(){

    quickSort(values, 0, values.length);
    print("Sorted Array:" + values);
}
function InsertionSort(){
    
    insertionSort(values);
    print("Sorted Array:" + values);
}

function SelectionSort(){
    
}

function HeapSort(){
    
}

function CountingSort(){
    
}
function MergeSort(){
    mergeSort(values);
    print("Sorted Array:" + values);
}


/*async function insertionSort(arr){
    var i, len = arr.length, el, j;
  
    for(i = 1; i<len; i++){
      el = arr[i];
      j = i;
  
      while(j>0 && arr[j-1]>toInsert){
        await swap(arr, j);
        states[j] = 1;
        arr[j] = arr[j-1];
        states[j-1] = 0;

        j--;
     }
  
     arr[j] = el;
    }
  
    return arr;
  }
*/
//Asynchronous Definition of Quick Sort Function 
async function quickSort(arr, start, end) { 
    if(start >= end) { 
        return; 
    } 
    let index = await partition(arr, start, end); 
    states[index] = -1; 
      
    // Promise.all is used so that each function 
    // should invoke simultaneously 
    await Promise.all([quickSort(arr, start, index-1), 
            quickSort(arr, index+1, end)]); 
} 
// Asynchronous Definition of Partition Function 
async function partition(arr, start, end) { 
              
    for(let i = start; i< end; i++) { 
        states[i] = 1; 
    } 
      
    let pivotIndex = start; 
    let pivotValue = arr[end]; 
    states[pivotIndex] = 0; 
      
    for(let i = start; i < end; i++) { 
        if(arr[i]<pivotValue) { 
            await swap(arr, i, pivotIndex); 
            states[pivotIndex] = -1; 
            pivotIndex++; 
            states[pivotIndex] = 0; 
        } 
    } 
      
    await swap(arr, pivotIndex, end); 
      
        for(let i = start; i < end; i++) { 
            states[i] = -1; 
        } 
      
    return pivotIndex; 
} 
// Definition of bubble sort 
async function bubbleSort(arr, start, end) { 
    if(start >= end) { 
        return; 
    } 
    
    for(var i = 0; i < end-1; i++) { 
        for(var j = 0; j < end-i-1; j++) { 
            if(arr[j] >= arr[j+1]) { 
                states[j] = 1; 
   
                // Call to swap function 
                await swap(arr, j, j+1); 
                states[j+1] = 0; 
            } 
            states[j] = 2; 
        } 
    } 
    return arr; 
} 
// Definition of draw function 
function draw() { 
    background("white"); 
      
   for(let i = 0; i < values.length; i++) { 
      stroke(0); 
      //fill("blue"); 
          
        if(states[i] == 0) { 
            fill(255,0,0); //pivot element
        } 
        else if (states[i] == 1) {       
            fill("blue"); // Element currently sorting 
        } 
        else { 
            fill("green"); //sorted bars
        } 
        rect(i*w, height - values[i], w, values[i]); 
    } 
}   
// Definition of swap function 
async function swap(arr, a, b) { 
     
    await sleep(250); //call to sleep function
    let t = arr[a]; 
    arr[a] = arr[b]; 
    arr[b] = t; 
}    
// Definition of sleep function 
function sleep(ms) { 
    return new Promise(resolve => setTimeout(resolve, ms)); 
} 
