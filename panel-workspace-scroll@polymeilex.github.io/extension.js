import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class PanelWorkspaceScrollExtension {
    enable() {
        this.scrollEventId = Main.panel.connect('scroll-event', (_actor, event) => Main.wm.handleWorkspaceScroll(event));
        this.clickEventId = Main.panel.connect('button-press-event', (_actor, event) => {
            if (event.get_button() === 2) {  // Middle mouse button (button index 2) .  The left button is 1, right is 3 .
                Main.overview.toggle();
                return Clutter.EVENT_STOP;
            }
            return Clutter.EVENT_PROPAGATE;
        });
    }

    disable() {
        if (this.scrollEventId != null) {
            Main.panel.disconnect(this.scrollEventId);
            this.scrollEventId = null;
        }
        if (this.clickEventId) {
            Main.panel.disconnect(this.clickEventId);
            this.clickEventId = null;
        }
    }
}
