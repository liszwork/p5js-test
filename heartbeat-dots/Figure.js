class Circle {
    constructor(x, y, size = 50, color = '#AAA', is_move = false, is_debug = false) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.clear_move_setting();
        if ( !is_move ) {
            this.random_move_setting();
        }
        this.is_debug = is_debug;
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
    clear_move_setting() {
        this.movex = 0;
        this.movey = 0;
    }
    random_move_setting() {
        this.movex = randomInt(-50, 50) * 0.1;
        if ( -1 < this.movex && this.movex < 1 ) {
            this.movex = 1;
        }
        this.movey = randomInt(-50, 50) * 0.1;
        if ( -1 < this.movey && this.movey < 1 ) {
            this.movey = 1;
        }
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

