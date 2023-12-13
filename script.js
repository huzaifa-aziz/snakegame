document.addEventListener('DOMContentLoaded', () => {
    const grid = 20;
    const snakeSpeed = 200;

    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';

    let food = getRandomPosition();
    let gameInterval = setInterval(moveSnake, snakeSpeed);

    document.addEventListener('keydown', changeDirection);

    function moveSnake() {
        switch (direction) {
            case 'up':
                move(0, -1);
                break;
            case 'down':
                move(0, 1);
                break;
            case 'left':
                move(-1, 0);
                break;
            case 'right':
                move(1, 0);
                break;
        }

        if (isCollision()) {
            gameOver();
            return;
        }

        if (isEating()) {
            eatFood();
        }

        updateSnake();
        updateGame();
    }

    function move(x, y) {
        let newX = snake[0].x + x;
        let newY = snake[0].y + y;

        snake.unshift({ x: newX, y: newY });
    }

    function updateSnake() {
        const snakeElement = document.getElementById('snake');
        snakeElement.innerHTML = '';

        snake.forEach(segment => {
            const segmentElement = document.createElement('div');
            segmentElement.className = 'segment';
            segmentElement.style.top = `${segment.y * grid}px`;
            segmentElement.style.left = `${segment.x * grid}px`;
            snakeElement.appendChild(segmentElement);
        });
    }

    function changeDirection(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (direction !== 'down') direction = 'up';
                break;
            case 'ArrowDown':
                if (direction !== 'up') direction = 'down';
                break;
            case 'ArrowLeft':
                if (direction !== 'right') direction = 'left';
                break;
            case 'ArrowRight':
                if (direction !== 'left') direction = 'right';
                break;
        }
    }

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * grid),
            y: Math.floor(Math.random() * grid)
        };
    }

    function updateGame() {
        if (snake[0].x === food.x && snake[0].y === food.y) {
            food = getRandomPosition();
        } else {
            snake.pop();
        }
    }

    function isEating() {
        return snake[0].x === food.x && snake[0].y === food.y;
    }

    function eatFood() {
        snake.unshift({ x: food.x, y: food.y });
        food = getRandomPosition();
    }

    function isCollision() {
        const head = snake[0];
        return (
            head.x < 0 ||
            head.x >= grid ||
            head.y < 0 ||
            head.y >= grid ||
            isSnakeCollision()
        );
    }

    function isSnakeCollision() {
        const head = snake[0];
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function gameOver() {
        clearInterval(gameInterval);
        alert('Game Over! Refresh the page to play again.');
    }
});
