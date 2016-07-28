

export class Animation{
    animators = [
        'Base-Animator',
        'CSS-Animator',
        'Velocity-Animator',
        'TinyAnimate-Animator',
        'GreenSock-Animator'
    ];

    removeAnimator(animator) {
        var index = this.animators.indexOf(animator);
        this.animators.splice(index, 1);
    }
}