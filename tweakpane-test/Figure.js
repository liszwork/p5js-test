class Circle {
    constructor(x, y, size, color, is_debug = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.is_debug = is_debug;
        this.movex = randomInt(-5, 5);
        this.movey = randomInt(-5, 5);
    }
    draw(color = '', is_update_color = false) {
        if (color.length) {
            fill(color);
            if (is_update_color) {
                this.color = color;
            }
        }
        else if (this.color.length) {
            fill(this.color);
        }
        ellipse(this.x, this.y, this.size);
        this.log();
    }
    is_near(x, y) {
        if (abs(this.x - x) >= NEAR_RANGE) {
            return false;
        }
        if (abs(this.y - y) >= NEAR_RANGE) {
            return false;
        }
        return true;
    }
    move () {
        this.x += this.movex;
        this.y += this.movey;
    }
    is_got_out_screen() {
        if (this.x < 0 || width < this.x ) {
            return true;
        }
        if (this.y < 0 || height < this.y ) {
            return true;
        }
        return false;
    }
    log(prefix = '') {
        if (!this.is_debug) {
            return;
        }
        console.log(`${prefix} x, y, size = ${this.x}, ${this.y}, ${this.size}, ${this.color}`);
    }
}

