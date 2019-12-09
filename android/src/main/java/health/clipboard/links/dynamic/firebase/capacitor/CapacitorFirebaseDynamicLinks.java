package health.clipboard.links.dynamic.firebase.capacitor;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.dynamiclinks.FirebaseDynamicLinks;
import com.google.firebase.dynamiclinks.PendingDynamicLinkData;

import android.util.Log;

import androidx.annotation.NonNull;

import static android.content.ContentValues.TAG;

@NativePlugin()
public class CapacitorFirebaseDynamicLinks extends Plugin {

    private static final String EVENT_DEEP_LINK = "deepLinkOpen";

    @Override
    protected void handleOnNewIntent(Intent intent) {
        super.handleOnNewIntent(intent);

        FirebaseDynamicLinks.getInstance()
                .getDynamicLink(intent)
                .addOnSuccessListener(getActivity(), new OnSuccessListener<PendingDynamicLinkData>() {
                    @Override
                    public void onSuccess(PendingDynamicLinkData pendingDynamicLinkData) {
                        Uri deepLink = null;
                        if (pendingDynamicLinkData != null) {
                            deepLink = pendingDynamicLinkData.getLink();
                        }

                        if (deepLink != null) {
                            JSObject ret = new JSObject();
                            ret.put("url", deepLink.toString());
                            notifyListeners(EVENT_DEEP_LINK, ret, true);
                        }
                    }
                })
                .addOnFailureListener(getActivity(), new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "getDynamicLink:onFailure", e);
                    }
                });
    }
}
