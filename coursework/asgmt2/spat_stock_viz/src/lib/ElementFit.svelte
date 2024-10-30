<script>
    export let widthRatio = 16;
    export let heightRatio = 9;

    let clientWidth;
    let clientHeight;

    let contentWidth;
    let contentHeight;

    // Reactive statement to calculate the appropriate dimensions
    $: {
        const aspectRatio = widthRatio / heightRatio;

        if (clientWidth / clientHeight > aspectRatio) {
            // Container is wider than the desired aspect ratio
            contentHeight = clientHeight;
            contentWidth = clientHeight * aspectRatio;
        } else {
            // Container is taller than the desired aspect ratio
            contentWidth = clientWidth;
            contentHeight = clientWidth / aspectRatio;
        }
    }
</script>

<div bind:clientHeight bind:clientWidth class="container">
    <div class="content" style="width: {contentWidth}px; height: {contentHeight}px">
        <slot/>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }
</style>
