<script lang="ts">
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

    const animationDuration = 8000;
    let visible = false;
    let showIntro = true;
    let selected = `Let's see what we have in store for you!`;
    const options = ['Cereal with banana', 'Domino\'s Pizza', 'Chilli', 'Pasta Bolonese', 'Gin and Tonic', 'Gormet Burgers', 'Kebapcheta and Kiufteta'];

    function selectAtRandom() {
        visible = !visible;
        showIntro = false;

        const pickIsIn = getRandomInteger(0, options.length);
        const carouselOptions = [
            ...options.slice(0, pickIsIn),
            ...options.slice(pickIsIn + 1)
        ]

        console.log(options[pickIsIn], carouselOptions);
        const changeSelectionInterval = animationDuration / 10;

        const interval = setInterval(() => {
            const randomIndex = getRandomInteger(0, carouselOptions.length);
            selected = carouselOptions[randomIndex];
        }, changeSelectionInterval);

        setTimeout(() => {
            selected = options[pickIsIn];
            clearInterval(interval);
        }, animationDuration - changeSelectionInterval - 10);
    }

    function getRandomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

	function spin(node, { duration }) {
		return {
			duration,
			css: (t: number) => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${~~(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}

    const data = [
        {
            id: 1,
            name: "Plain Pasta",
            cuisine: "Italian",
            ingredients: [
                "spaghetti",
                "tomato sauce",
                "tomato sauce",
                "tomato sauce",
            ],
            spices: ["oregano", "salt", "hot sauce"],
            type: ["Brunch", "Lunch", "Dinner"],
            cookingTime: {
                min: 25,
                max: 30,
            },
            tags: ["quick", "easy", "pasta"],
        },
    ];
    const meal = data[0];
</script>

<style>
    .card-label {
        @apply text-lg text-blue-800 font-semibold;
    }

    button.primary {
        @apply px-4 pt-1.5 pb-1 text-lg text-svelte-800 rounded-lg hover:text-white hover:bg-svelte-200 hover:border-transparent focus:outline-none focus:bg-svelte-400 focus:text-white uppercase;
    }
</style>

<h2>Dashboard bro</h2>

<div class="flex relative w-80 h-80 mx-auto my-4 rounded-xl shadow-md">
    <button class="primary self-start mx-auto" on:click={selectAtRandom}>Pick my next meal</button>

    {#if visible}
        <div class="absolute left-1/3 top-1/2 w-full" in:spin="{{duration: animationDuration}}" out:fade>
            <span class="absolute text-xl">{selected}</span>
        </div>
    {:else if showIntro}
        <div class="absolute left-auto top-1/2 w-full" out:fade>
            <span class="absolute text-lg p-4">`Let's see what we have in store for you!`</span>
        </div>
    {/if}
</div>

<div
    class="grid grid-rows-2 grid-flow-col gap-2 w-80 mx-auto bg-white rounded-xl shadow-md">
    <div class="relative min-w-full sm:mx-0 sm:flex-shrink-0 shadow-md">
        <img src="https://picsum.photos/id/163/360/200" alt="Eating Location" />
        <div class="absolute bottom-1 left-1 bg-black bg-opacity-40 px-2 py-1">
            <p class="text-lg text-white font-semibold">{meal.name}</p>
            <p class="text-md text-white font-thin italic">{meal.cuisine}</p>
        </div>
    </div>

    <div class="relative text-left space-y-2 py-4 px-4 sm:text-left">
        <div class="space-y-1">
            <p class="text-black">
                <span class="card-label">Prep time</span>:
                {meal.cookingTime.min}
                -
                {meal.cookingTime.max}
                min
            </p>
            <p>
                <span class="card-label">Ingerdients</span>:
                {meal.ingredients.join(', ')}
            </p>
        </div>
        <button class="primary absolute left-2 bottom-2">Select</button>
    </div>
</div>