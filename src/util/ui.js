export class UIUtil
{
    static SIZING_STYLE = [
        'letter-spacing',
        'line-height',
        'padding-top',
        'padding-bottom',
        'font-family',
        'font-weight',
        'font-size',
        'text-rendering',
        'text-transform',
        'width',
        'text-indent',
        'padding-left',
        'padding-right',
        'border-width',
        'box-sizing',
    ];

    static HIDDEN_STYLE = `
        min-height:0 !important;
        max-height:none !important;
        height:0 !important;
        visibility:hidden !important;
        overflow:hidden !important;
        position:absolute !important;
        z-index:-1000 !important;
        top:0 !important;
        right:0 !important
    `;

    static MAX_CACHE_COUNT = 10;

    static COMPUTED_STYLE_CACHE = [];

    static ELEMENT = null;

    static ComputeStyle(node){
        const id = node.getAttribute('id');
        const cache = this.COMPUTED_STYLE_CACHE.find(x => x.id = id);

        if(cache){
            return cache.nodeInfo;
        }

        const style = window.getComputedStyle(node);

        const boxSizing = (
            style.getPropertyValue('box-sizing') ||
            style.getPropertyValue('-moz-box-sizing') ||
            style.getPropertyValue('-webkit-box-sizing')
        );
    
        const paddingSize = (
            parseFloat(style.getPropertyValue('padding-bottom')) +
            parseFloat(style.getPropertyValue('padding-top'))
        );
    
        const borderSize = (
            parseFloat(style.getPropertyValue('border-bottom-width')) +
            parseFloat(style.getPropertyValue('border-top-width'))
        );

        const sizingStyle = this.SIZING_STYLE
            .map(name => `${name}:${style.getPropertyValue(name)}`)
            .join(';');
        
        const lineHeight = parseFloat(style.getPropertyValue('line-height'))

        const nodeInfo = {
            sizingStyle,
            paddingSize,
            borderSize,
            boxSizing,
            lineHeight
        };

        this.COMPUTED_STYLE_CACHE.push({id, nodeInfo});

        if(this.COMPUTED_STYLE_CACHE.length > this.MAX_CACHE_COUNT){
            this.COMPUTED_STYLE_CACHE.shift();
        }

        return nodeInfo;
    }

    static ComputeAutoHeight(node, minRows = null, maxRows = null, assignValue = (src,target)=>target.value = src.value){
        const { sizingStyle, paddingSize, borderSize, boxSizing, lineHeight } = this.ComputeStyle(node);
        if(this.ELEMENT && this.ELEMENT.tagName !== node.tagName){
            this.ELEMENT.parentNode.removeChild(this.ELEMENT);
            this.ELEMENT = null;
        }
        if(!this.ELEMENT){
            this.ELEMENT = document.createElement(node.tagName);
            document.body.appendChild(this.ELEMENT);
        }
        this.ELEMENT.setAttribute('style',`${this.HIDDEN_STYLE};${sizingStyle}`);
        assignValue(node, this.ELEMENT);

        let minHeight = Number.MIN_SAFE_INTEGER;
        let maxHeight = Number.MAX_SAFE_INTEGER;
        let height = this.ELEMENT.scrollHeight;
        let overflowY;

        if(minRows){
            minHeight = lineHeight * minRows;
            if (boxSizing === 'border-box') {
                minHeight = minHeight + paddingSize + borderSize;
            }
            height = Math.max(minHeight, height);
        }

        if(maxRows){
            maxHeight = lineHeight * maxRows;
            if (boxSizing === 'border-box') {
                maxHeight = maxHeight + paddingSize + borderSize;
            }
            overflowY = height > maxHeight ? '' : 'hidden';
            height = Math.min(maxHeight, height);
        }

        return {
            height: `${height}px`,
            minHeight: `${minHeight}px`,
            maxHeight:`${maxHeight}px`,
            overflowY
        }
    }
}