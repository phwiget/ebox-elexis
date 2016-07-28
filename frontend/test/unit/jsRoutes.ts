var jsRoutes = {}; (function(_root){
    var _nS = function(c,f,b){var e=c.split(f||"."),g=b||_root,d,a;for(d=0,a=e.length;d<a;d++){g=g[e[d]]=g[e[d]]||{}}return g}
    var _qS = function(items){var qs = ''; for(var i=0;i<items.length;i++) {if(items[i]) qs += (qs ? '&' : '') + items[i]}; return qs ? ('?' + qs) : ''}
    var _s = function(p,s){return p+((s===true||(s&&s.secure))?'s':'')+'://'}
    var _wA = function(r){return {ajax:function(c){c=c||{};c.url=r.url;c.type=r.method;return jQuery.ajax(c)}, method:r.method,type:r.method,url:r.url,absoluteURL: function(s){return _s('http',s)+'localhost:9000'+r.url},webSocketURL: function(s){return _s('ws',s)+'localhost:9000'+r.url}}}
    _nS('controllers.patient.PatientCtrl'); _root['controllers']['patient']['PatientCtrl']['list'] =
        function(search0) {
            return _wA({method:"GET", url:"/" + "patient/list" + _qS([(function(k,v) {return encodeURIComponent(k)+'='+encodeURIComponent(v)})("search", search0)])})
        }
    ;
    _nS('controllers.patient.PatientCtrl'); _root['controllers']['patient']['PatientCtrl']['detail'] =
        function(number0) {
            return _wA({method:"GET", url:"/" + "patient/detail" + _qS([(function(k,v) {return encodeURIComponent(k)+'='+encodeURIComponent(v)})("number", number0)])})
        }
    ;
    _nS('controllers.medication.MedicationCtrl'); _root['controllers']['medication']['MedicationCtrl']['list'] =
        function(patientId0) {
            return _wA({method:"GET", url:"/" + "medication-order/list" + _qS([(function(k,v) {return encodeURIComponent(k)+'='+encodeURIComponent(v)})("patientId", patientId0)])})
        }
    ;
})(jsRoutes)