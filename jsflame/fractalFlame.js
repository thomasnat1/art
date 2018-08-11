// let triangleFunctions = [
//     function(point){
//         return [(point[0]/2), (point[1]/2)];
//     },
//     function(point){
//         return [((point[0]+1)/2), (point[1]/2)];
//     },
//     function(point){
//         return [(point[0]/2), ((point[1]+1)/2)];
//     }
// ];


// let tallTriangleFunctions = [
//     function(point){
//         return [(point[0]/2), (point[1]/2)];
//     },
//     function(point){
//         return [ (point[0]/2) + (1/2), point[1] / 2];
//     },
//     function(point){
//         return [(point[0]/2) + (1/4), ((point[1]/2) +(1/2))];
//     }
// ];

//todo change to transform
function pickVariation(variations){
    //sum weight. Note these are the weights of each variation, not the weight of the transform 
    let totalWeight = variations[0].weight;
    let cummuWeights = [variations[0].weight];

    for (let i = 1; i < variations.length; i++) {
        cummuWeights.push(variations[i].weight + cummuWeights[i-1])
        totalWeight += variations[i].weight;
    }

    //generate rand float with max of sum weights 
    let pickedNum = Math.random() * totalWeight;

    //iterate through weight to see where num falls 
    if(pickedNum < variations[0].weight) return variations[0];
    for(let i = 1; i < variations.length; i++){
        if(pickedNum > variations[i - 1].weight && pickedNum < cummuWeights[i]) return variations[i]
    }
}

allVariations = {
    linear: function(point){
        return point;
    }
}

transform1 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0,
                         d: 0,
                         e: 0.5,
                         f: 0
                        }
             };
transform2 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0.5,
                         d: 0,
                         e: 0.5,
                         f: 0
                        }
             };

transform3 = {  variations: [{name: 'linear', weight:1.0},
                            ],
                params: {a: 0.5,
                         b: 0,
                         c: 0,
                         d: 0,
                         e: 0.5,
                         f: 0.5
                        }
};

// transforms = [transform1, transform2, transform3];
// function dumbIFS(){
//     for(let i = 0; i < 10; i++){
//         let point = [(Math.random()) * 2 - 1, (Math.random()) * 2 - 1]
//         let point2 = point;
        
//         for(let j = 0; j < 50; j++){
//             console.log("before: ", point, point2);
//             let chosen = getRandomInt(3);
//             let func = triangleFunctions[chosen];
//             point = func(point);
            
//             let transform = transforms[chosen];
//             point2 =  [(transform.params.a * point2[0]) + (transform.params.b * point2[1]) + (transform.params.c), 
//                        (transform.params.d * point2[0]) + (transform.params.e * point2[1]) + (transform.params.f) ];

            
//             console.log("funcs: ", func, transform.params);
//             console.log("after: ", point, point2);

//             if(j > 20){
//                 // paintPointToCanvas({x: point[0], y: point[1]});
//                 paintPointToCanvas({x: point2[0], y: point2[1]});
//             }
//         }
//     }
// }

function IFS(point, transforms){
    for (let j = 0; j < 500; j++) {       

        //need to randomly pick a transform
        let transform = randomItem(transforms);

        //todo: we need to sum all of the variations of each transform and multiply each variation function result by the weight of the variation
        // let func = allVariations[pickVariation(transform.variations).name]; 

        //we morph the point based on params and put it through the chosen function 
        point =  {x: (transform.params.a * point.x) + (transform.params.b * point.y) + (transform.params.c), 
                  y: (transform.params.d * point.x) + (transform.params.e * point.y) + (transform.params.f) };
        // point = func(point);

        if(j > 20){ 
            paintPointToCanvas(point);
            // console.log([point.x * 500, point.y * 500])
        }
    }
}

function randomItem(items){
    return items[Math.floor(Math.random()*items.length)];
}

function paintPointToCanvas(point){
    let canvas = document.getElementById('mainCanvas');
    let context = canvas.getContext("2d");
    context.fillStyle = `rgb(0, 0, 0)`;

    let convertedPoint = [(point.x * (canvas.width / 2)) + (canvas.width / 2), 
                          (point.y * (canvas.height / 2)) + (canvas.height / 2)
                         ];

    context.fillRect(convertedPoint[0], convertedPoint[1], 1, 1);
    // console.log(convertedPoint);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function drawAndCalculateFlame(transforms){
    for (let i = 0; i < 200; i++) {

        let point = {x:(Math.random()) * 2 - 1, y: (Math.random()) * 2 - 1}
        IFS(point, transforms);

    }
}

drawAndCalculateFlame([transform1, transform2, transform3]);
// dumbIFS();
  //todos
  //probability weights to transforms  