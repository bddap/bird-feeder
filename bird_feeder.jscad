
const h = 175;
const thick = 4;
const w = h/4;

function main() {
    return [
        difference(
            hopper(),
            cube({center: [1,1,0]})
                .scale([h,h,w/2]),
            string_holes()
        ),
        ramp(),
        perches()
    ]
}

function string_holes() {
    return cylinder({center: true})
        .scale([thick/2,thick/2,w])
        .rotateY(90)
        .translate([0,0,h-thick*2.5])
}

function perches() {
    const a = union(
        perch(),
        perch().mirroredY()
    )
    
    const b = union(
        perch_mount(),
        perch_mount().mirroredX()
    )
    
    return union(a, b)
}

function perch_mount() {
    return cylinder({center: true})
        .scale([thick/2,thick/2,w+thick*5])
        .rotateY(90)
        .rotateZ(90)
        .translate([w/2,0,w/2-thick/2])
}

function perch() {
    return cylinder({center: true})
        .scale([thick/2,thick/2,w])
        .rotateY(90)
        .translate([0,w/2+thick*2,w/2-thick/2])
}

function hopper() {
    const c = cube({center: [1,1,0]})
        .scale([w,w/4*3,h])
    
    const b = difference(
        c,
        c.scale([1-thick/w, 1-thick/w, 1])
    )
    
    return b
}

function ramp() {
    const a = union(
        ramp_point(),
        ramp_case()
    )
    return difference(
        a,
        ramp_point_hole()
    )
}

function ramp_point() {
    const a = cube({center: true})
        .rotateX(45)
        
    const b = intersection(
        a,
        cube({center: [1,1,0]})
    )
    
    return b.scale(w)
}

function ramp_point_hole() {
    return union(
        ramp_point()
            .translate([0,0,-thick]),
        cube({center: true})
            .scale(w)
            .translate([0,0,-w/4-thick/2])
    )
}

function ramp_case() {
    const c = cube({center: [1,1,0]})
        .scale([w,w,w/2])
    
    return difference(
        c,
        c.scale([1-thick/w, 1-thick/w, 1])
        )
}