<script lang="ts">
    const listOfFacts = [
        "play blue archive twin ♥️",
        "💢😭😭😭 😭💢😭😭 😭😭💢 😭  😭💢 😭💢😭 💢😭💢😭 😭😭😭😭 😭😭 😭😭😭💢 😭",
        "vimal cloud!!!!",
        "my dih is longer than yours 😏",
        "i love coding in svelte (10 hours spent trying to fix a bug)",
        "cunny code",
        "do you know? vimal its vimal? wow.",
        "farid31j is my femboy (real 100%)",
        "aru",
        "based",
        '"ubuntu its trash" no twin every distro have pros and cons',
        "i usually code python but idk i like svelte i guess",
        "the cake is a lie"
    ]

    function getRandomItem<T>(list: T[]): T | undefined {
        if (list.length === 0) {
            return undefined;
        }
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }

</script>


<p class="flex mb-5 text-white font-mono text-xs">{getRandomItem(listOfFacts)}</p>

